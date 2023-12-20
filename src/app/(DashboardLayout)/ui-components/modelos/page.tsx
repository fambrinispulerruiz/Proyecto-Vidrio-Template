'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Stack, DialogTitle, DialogContent, DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { red } from '@mui/material/colors';
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PDFViewer, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

interface Modelo {
  id: number;
  nombre: string;
  empresa: {
    title: string;
  },
  activo: boolean;
}

interface Empresa {
  id: number;
  name: string;
  tipoEmpresa: string;
  telefono: string;
  correo: string;
  domicilio: string;
  activo: boolean;
}

const NuevoFormulario = () => {

  const [rows, setRows] = useState<Modelo[]>([]);
  const [empresas, setSelect] = useState<Empresa[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    empresa_id: '', // Este campo almacenará el ID de la empresa seleccionada
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    // This function will be called when the component mounts
    const fetchData = async () => {
      try {
        const username = 'sven';
        const password = 'pass';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        const response = await fetch("http://localhost:8080/restful/services/simple.Modelos/actions/verModelos/invoke", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
          },
        });

        const data = await response.json();
        const sortedData = data.sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        setRows(sortedData);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    // This function will be called when the component mounts
    const fetchData = async () => {
      try {
        const username = 'sven';
        const password = 'pass';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        const response = await fetch("http://localhost:8080/restful/services/simple.Empresas/actions/VerEmpresas/invoke", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
          },
        });

        const data = await response.json();
        console.log(data)
        // Set the obtained data to the 'rows' state
        setSelect(data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);



  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    if ('target' in event) {
      const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
      console.log(`TextField Change - name: ${name}, value: ${value}`);
      setFormData((prevData) => ({
        ...prevData,
        [name || '']: value,
      }));
    } else {
      const selectedValue = (event as SelectChangeEvent<string>).target?.value || '';
      console.log(`Select Change - selectedValue: ${selectedValue}`);
      setFormData((prevData) => ({
        ...prevData,
        tipoEmpresa: selectedValue,
      }));
    }
  };

  const handleFormSubmit = async () => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(
        `http://localhost:8080/restful/objects/vidrios.Empresa/${formData.empresa_id}/actions/agregarModelo/invoke`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all',
          },
          body: JSON.stringify({
            nombre: { value: formData.nombre }
          }),
        }
      );

      // Recarga la página después de enviar los datos
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error al enviar datos a la base de datos.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleOpenEditModal = async (row: Modelo) => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/restful/objects/modelos.Modelo/${row.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
      });

      if (response.ok) {
        const modeloData = await response.json();

        const empresaId = modeloData.empresa.href.split('/').pop();

        // Actualiza el estado con los datos que trae el fetch
        setFormData({
          id: modeloData.id,
          nombre: modeloData.nombre,
          empresa_id: empresaId,
        });

        setSelectedId(row.id);
        setOpenEditModal(true);
      } else {
        console.error('Error al obtener los datos de la empresa');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/restful/objects/modelos.Modelo/${formData.id}/actions/updateName/invoke`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
        body: JSON.stringify({
          nombre: { value: formData.nombre }
        }),
      });

      // Recarga la página después de enviar los datos
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al enviar datos a la base de datos.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const actionName = isActive ? 'delete' : 'activar';
      const actionURL = `http://localhost:8080/restful/objects/modelos.Modelo/${id}/actions/${actionName}/invoke`;
      
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(actionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
      });

      if (response.ok) {
        // Actualizar el estado local si es necesario
        // Mostrar el diálogo con el mensaje
        setDialogMessage(`Acción "${isActive ? 'Desactivar' : 'Activar'}" completada con éxito`);
        setDialogOpen(true);
      } else {
        setDialogMessage(`Error al realizar la acción: ${response.statusText}`);
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage('Error al realizar la solicitud');
      setDialogOpen(true);
    }
  };

   //------------------------------------------------------------------------------------

   const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: 'column',
      width: '40%',
    },
    headerRight: {
      flexDirection: 'column',
      width: '40%',
      textAlign: 'right',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      marginBottom: 20,
    },
    rowH: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 30, // Ajusta la altura según tus necesidades
      backgroundColor: '#2249839e'
    },
    rowC: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 30, // Ajusta la altura según tus necesidades
    },
    headerCell: {
      color: '#ffffff',
    },
    cell: {
      margin: 'auto',
      fontSize: 10,
      padding: 5,
      textAlign: 'center', // Centra el texto en las celdas
    },
    date: {
      fontSize: 12,
      color: '#555',
    },
  });

  const MyDocument = ({ data }: { data: Modelo[] }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>El Emporio de el Vidrio</Text>
              <Text style={{ fontSize: 10, color: '#555' }}>Dirección: Pasaje Sayi 665</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Registro de Modelos</Text>
              <Text style={{ fontSize: 12, color: '#555' }}>Fecha: {formattedDate}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Registro de Modelos</Text>

          {/* Table */}
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={styles.rowH}>

              <Text style={[styles.cell, styles.headerCell, { width: '15%' }]}>ID</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '20%' }]}>Nombre</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '30%' }]}>Empresa</Text>
            </View>

            {data.map((item) => {

              return (
                <View key={item.id} style={styles.rowC}>
                  <Text style={[styles.cell, { width: '15%' }]}>{item.id}</Text>
                  <Text style={[styles.cell, { width: '20%' }]}>{item.nombre}</Text>
                  <Text style={[styles.cell, { width: '15%' }]}>{item.empresa.title}</Text>
                  {/* Agrega más celdas según tus necesidades */}
                </View>
              )
            })}
          </View>
        </Page>
      </Document>
    )
  };

  const generatePDF = async (data: Modelo[]) => {
    // Renderiza el componente React a un Blob
    const pdfBlob = await pdf(<MyDocument data={data} />);

    // Obtiene el Blob del objeto pdfBlob
    const blob = await pdfBlob.toBlob();

    // Ahora, puedes usar saveAs con el Blob
    saveAs(blob, 'Reporte de Modelos - El Emporio del Vidrio.pdf');
  };


  const handleExportToPDF = async () => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch("http://localhost:8080/restful/services/simple.Modelos/actions/verModelos/invoke", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
      });

      const data = await response.json();

      generatePDF(data);

    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };


  //------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenAddModal}>
            Agregar Modelo
          </Button>
          <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
            Exportar a PDF
          </Button>
        </Box>
        <Dialog open={openAddModal} onClose={handleCloseAddModal}>
          <DialogTitle>Agregar Modelo</DialogTitle>
          <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Complete el Formulario del Modelo">
                <>
                  <Stack spacing={3}>
                    {/* Selector de Modelo */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">Empresa</InputLabel>
                      <Select
                        labelId="empresa-label"
                        id="empresa"
                        name="empresa_id"
                        label="Empresa"
                        value={formData.empresa_id}
                        onChange={(event) =>
                          setFormData({ ...formData, empresa_id: event.target.value })
                        }
                      >
                        {empresas.map((empresa) => (
                          <MenuItem key={empresa.id} value={empresa.id}>
                            {empresa.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="nombre"
                      name="nombre"
                      label="Nombre"
                      variant="outlined"
                      fullWidth
                      value={formData.nombre}
                      onChange={handleFormChange}
                    />


                  </Stack>
                  <br />
                  <Button onClick={handleFormSubmit}>
                    Cargar
                  </Button>
                </>
              </BaseCard>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
          </DialogActions>
        </Dialog>
        <BaseCard title="Modelos">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Empresa</TableCell> 
                <TableCell>Activo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.empresa.title}</TableCell>
                  <TableCell>{row.activo ? "Sí" : "No"}</TableCell>
               
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="primary"
                      onClick={() => handleOpenEditModal(row)}
                    >
                      Editar
                    </Button> <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                      <DialogTitle>Editar Modelo</DialogTitle>
                      <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                        <Grid item xs={12} lg={12}>
                          <BaseCard title="Editar Modelo">
                            <>
                              <Stack spacing={3}>
                                {/* Selector de Modelo */}
                                {/* <FormControl fullWidth>
                                  <InputLabel id="empresa-label">Empresa</InputLabel>
                                  <Select
                                    labelId="empresa-label"
                                    id="empresa"
                                    name="empresa_id"
                                    label="Empresa"
                                    value={formData.empresa_id}
                                    onChange={(event) =>
                                      setFormData({ ...formData, empresa_id: event.target.value })
                                    }
                                  >
                                    {empresas.map((empresa) => (
                                      <MenuItem key={empresa.id} value={empresa.id}>
                                        {empresa.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl> */}
                                {/* Campo de Nombre Asegurado */}
                                <TextField
                                  id="nombre"
                                  name="nombre"
                                  label="Nombre"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.nombre}
                                  onChange={handleFormChange}
                                />
                              </Stack>
                              <br />
                              <Button onClick={handleEditSubmit}>
                                Confirmar Edición
                              </Button>
                            </>
                          </BaseCard>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseEditModal}>Cancelar</Button>
                      </DialogActions>
                    </Dialog>

                    <Button
                      startIcon={row.activo ? <DeleteIcon /> : <CheckCircleOutlineIcon />} // Cambia el ícono según el valor de "activo"
                      color={row.activo ? "secondary" : "success"} // Cambia el color según el valor de "activo"
                      onClick={() => handleToggleActive(row.id, row.activo)}
                    >
                      {row.activo ? "Desactivar" : "Activar"}
                    </Button>
                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                      <DialogContent>
                        {dialogMessage}
                        <Button onClick={() => window.location.reload()}>Aceptar</Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {showAlert && (
                        <SweetAlert
                          warning
                          showCancel
                          confirmBtnText="Sí, editar"
                          cancelBtnText="Cancelar"
                          confirmBtnBsStyle="danger"
                          cancelBtnBsStyle="default"
                          title="¿Editar modelo?"
                          onConfirm={handleSweetAlertConfirm}
                          onCancel={handleSweetAlertCancel}
                        >
                          Confirmar la edición del modelo.
                        </SweetAlert>
                      )} */}
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default NuevoFormulario;
