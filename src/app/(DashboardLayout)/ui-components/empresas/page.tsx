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

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');


  const [rows, setRows] = useState<Empresa[]>([]);

  // State para el formulario
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    domicilio: '',
    telefono: '',
    correo: '',
    tipoEmpresa: '',
  });

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleOpenEditModal = async (row: Empresa) => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/restful/objects/vidrios.Empresa/${row.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
      });

      if (response.ok) {
        const empresaData = await response.json();

        // Actualiza el estado con los datos que trae el fetch
        setFormData({
          id: empresaData.id,
          nombre: empresaData.name,
          domicilio: empresaData.domicilio,
          telefono: empresaData.telefono,
          correo: empresaData.correo,
          tipoEmpresa: empresaData.tipoEmpresa,
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

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };



  useEffect(() => {

    const fetchData = async () => {
      try {
        const username = 'sven';
        const password = 'pass';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        const response = await fetch("http://localhost:8080/restful/services/simple.Empresas/actions/VerEmpresas/invoke", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis/v2"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2'
          },
        });

        const data = await response.json();
        const sortedData = data.sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        setRows(sortedData);

      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  //---------------------------------Formulario de carga--------------------------------

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

      const response = await fetch("http://localhost:8080/restful/services/simple.Empresas/actions/CrearEmpresa/invoke", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
        body: JSON.stringify({
          nombre: { value: formData.nombre },
          domicilio: { value: formData.domicilio },
          telefono: { value: formData.telefono },
          correo: { value: formData.correo },
          tipoEmpresa: { value: formData.tipoEmpresa },
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

  const MyDocument = ({ data }: { data: Empresa[] }) => {
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
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Registro de Empresas</Text>
              <Text style={{ fontSize: 12, color: '#555' }}>Fecha: {formattedDate}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Registro de Empresas</Text>

          {/* Table */}
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={styles.rowH}>

              <Text style={[styles.cell, styles.headerCell, { width: '15%' }]}>ID</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '20%' }]}>Nombre</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '15%' }]}>Tipo de Empresa</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '20%' }]}>Telefono</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '20%' }]}>Correo</Text>
              <Text style={[styles.cell, styles.headerCell, { width: '20%' }]}>Domicilio</Text>
            </View>

            {data.map((item) => {

              return (
                <View key={item.id} style={styles.rowC}>
                  <Text style={[styles.cell, { width: '15%' }]}>{item.id}</Text>
                  <Text style={[styles.cell, { width: '20%' }]}>{item.name}</Text>
                  <Text style={[styles.cell, { width: '15%' }]}>{item.tipoEmpresa}</Text>
                  <Text style={[styles.cell, { width: '20%' }]}>{item.telefono}</Text>
                  <Text style={[styles.cell, { width: '20%' }]}>{item.correo}</Text>
                  <Text style={[styles.cell, { width: '20%' }]}>{item.domicilio}</Text>
                  {/* Agrega más celdas según tus necesidades */}
                </View>
              )
            })}
          </View>
        </Page>
      </Document>
    )
  };

  const generatePDF = async (data: Empresa[]) => {
    // Renderiza el componente React a un Blob
    const pdfBlob = await pdf(<MyDocument data={data} />);

    // Obtiene el Blob del objeto pdfBlob
    const blob = await pdfBlob.toBlob();

    // Ahora, puedes usar saveAs con el Blob
    saveAs(blob, 'Reporte de Empresas - El Emporio del Vidrio.pdf');
  };


  const handleExportToPDF = async () => {
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

      generatePDF(data);

    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };


  //------------------------------------------------------------------------------------------------------------------------------------------------------


  const handleEditSubmit = async () => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/restful/objects/vidrios.Empresa/${formData.id}/actions/updateName/invoke`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
        body: JSON.stringify({
          nombre: { value: formData.nombre },
          domicilio: { value: formData.domicilio },
          telefono: { value: formData.telefono },
          correo: { value: formData.correo },
          tipoEmpresa: { value: formData.tipoEmpresa },
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
      const actionURL = `http://localhost:8080/restful/objects/vidrios.Empresa/${id}/actions/${actionName}/invoke`;
      
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


  const tipoEmpresaSelect = [
    { id: 'Cliente', nombre: 'Cliente' },
    { id: 'Proveedor', nombre: 'Proveedor' },
    // Agrega más empresas según sea necesario
  ];

  // Asumiendo que la propiedad 'empresa' en 'row' contiene el id de la empresa asociada al modelo

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenAddModal}>
            Agregar Empresa
          </Button>
          <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
            Exportar a PDF
          </Button>
        </Box>
        <Dialog open={openAddModal} onClose={handleCloseAddModal}>
          <DialogTitle>Agregar Empresa</DialogTitle>
          <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Complete el Formulario de la Empresa">
                <>
                  <Stack spacing={3}>

                    {/* Campo de Nombre Empresa */}
                    <TextField
                      id="nombre"
                      label="Nombre"
                      name="nombre"
                      variant="outlined"
                      fullWidth
                      value={formData.nombre}
                      onChange={handleFormChange}
                    />

                    {/* Campo de Domicilio */}
                    <TextField
                      id="domicilio"
                      label="Domicilio"
                      name="domicilio"
                      variant="outlined"
                      fullWidth
                      value={formData.domicilio}
                      onChange={handleFormChange}
                    />

                    {/* Campo de Telefono */}
                    <TextField
                      id="telefono"
                      label="Telefono"
                      name="telefono"
                      variant="outlined"
                      fullWidth
                      value={formData.telefono}
                      onChange={handleFormChange}
                    />

                    {/* Campo de Correo */}
                    <TextField
                      id="email"
                      label="Correo"
                      name="correo"
                      variant="outlined"
                      fullWidth
                      value={formData.correo}
                      onChange={handleFormChange}
                    />

                    {/* Selector de Tipo Empresa */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">Tipo de Empresa</InputLabel>
                      <Select
                        labelId="tipoempresa-label"
                        id="tipoempresa"
                        label="TipoEmpresa"
                        name="tipoEmpresa"
                        value={formData.tipoEmpresa}
                        onChange={handleFormChange}
                      >
                        {tipoEmpresaSelect.map((tipoEmpresaSelect) => (
                          <MenuItem key={tipoEmpresaSelect.id} value={tipoEmpresaSelect.id}>
                            {tipoEmpresaSelect.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>


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
        <BaseCard title="Empresas">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo de Empresa</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Domicilio</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.tipoEmpresa}</TableCell>
                  <TableCell>{row.telefono}</TableCell>
                  <TableCell>{row.correo}</TableCell>
                  <TableCell>{row.domicilio}</TableCell>
                  <TableCell>{row.activo ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="primary"
                      onClick={() => handleOpenEditModal(row)}
                    >
                      Editar
                    </Button>
                    <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                      <DialogTitle>Editar Empresa</DialogTitle>
                      <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                        <Grid item xs={12} lg={12}>
                          <BaseCard title="Editar Empresa">
                            <>
                              <Stack spacing={3}>

                                <TextField
                                  id="nombre"
                                  name="nombre"
                                  label="Nombre"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.nombre}
                                  onChange={handleFormChange}
                                />

                                <TextField
                                  id="domicilio"
                                  name="domicilio"
                                  label="Domicilio"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.domicilio}
                                  onChange={handleFormChange}
                                />

                                <TextField
                                  id="telefono"
                                  name="telefono"
                                  label="Telefono"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.telefono}
                                  onChange={handleFormChange}
                                />

                                <TextField
                                  id="email"
                                  name="correo"
                                  label="Correo"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.correo}
                                  onChange={handleFormChange}
                                />

                                <FormControl fullWidth>
                                  <InputLabel id="modelo-label">Tipo de Empresa</InputLabel>
                                  <Select
                                    labelId="tipoempresa-label"
                                    id="tipoempresa"
                                    name="tipoEmpresa"
                                    label="TipoEmpresa"
                                    value={formData.tipoEmpresa}
                                    onChange={handleFormChange}
                                  >
                                    {tipoEmpresaSelect.map((tipoEmpresaSelect) => (
                                      <MenuItem key={tipoEmpresaSelect.id} value={tipoEmpresaSelect.id}>
                                        {tipoEmpresaSelect.nombre}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
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
                    {/* Botón "Desactivar" o "Activar" */}
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
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default NuevoFormulario;