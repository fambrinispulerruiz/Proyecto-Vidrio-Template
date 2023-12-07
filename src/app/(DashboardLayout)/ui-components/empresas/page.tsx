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



interface Empresa {
  id: number;
  name: string;
  tipoEmpresa: string;
  telefono: string;
  correo: string;
}

const NuevoFormulario = () => {

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
          },
        });

        const data = await response.json();

        setRows(data);

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

  const handleExportToPDF = async () => {
    try {

      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch("http://localhost:8080/restful/services/simple.Reportes/actions/generarReporteEmpresas/invoke", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
          // Puedes agregar otros encabezados si es necesario
        },
      });

      const data = await response.json();

      // Muestra la respuesta en la consola
      console.log(data);

      // Comprueba si la respuesta contiene el enlace al PDF
      if (data && data.result && data.result.value) {
        const pdfExportURL = data.result.value;

        // Abre el PDF en una nueva pestaña/tab
        window.open(pdfExportURL, '_blank');
      } else {
        console.error("La respuesta del servidor no contiene el enlace al PDF.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };


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

                                {/* <TextField
                                  id="domicilio"
                                  name="domicilio"
                                  label="Domicilio"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.domicilio}
                                  onChange={handleFormChange}
                                /> */}

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

                    <Button startIcon={<DeleteIcon />} color="secondary">
                      Desactivar
                    </Button>
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