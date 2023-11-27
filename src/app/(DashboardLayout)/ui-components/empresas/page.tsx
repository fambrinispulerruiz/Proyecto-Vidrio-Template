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

interface Empresa {
  id: number;
  name: string;
  tipoEmpresa: string;
  telefono: string;
  correo: string;
  // Agrega otras propiedades según sea necesario
}

const NuevoFormulario = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState<Empresa[]>([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

        // Set the obtained data to the 'rows' state
        setRows(data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

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



  const tipoEmpresaSelect = [
    { id: '1', nombre: 'Cliente' },
    { id: '2', nombre: 'Proveedor' },
    // Agrega más empresas según sea necesario
  ];


  const handleEditClick = () => {
    setOpenModal(true);
  };

  // Asumiendo que la propiedad 'empresa' en 'row' contiene el id de la empresa asociada al modelo

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenModal}>
            Agregar Empresa
          </Button>
          <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
            Exportar a PDF
          </Button>
        </Box>
        <Dialog open={openModal} onClose={handleCloseModal}>
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
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Domicilio */}
                    <TextField
                      id="domicilio"
                      label="Domicilio"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Telefono */}
                    <TextField
                      id="telefono"
                      label="Telefono"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Correo */}
                    <TextField
                      id="email"
                      label="Correo"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Selector de Tipo Empresa */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">Tipo de Empresa</InputLabel>
                      <Select
                        labelId="tipoempresa-label"
                        id="tipoempresa"
                        label="TipoEmpresa"
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
                  <Button>
                    Cargar
                  </Button>
                </>
              </BaseCard>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
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
                      onClick={handleEditClick}
                    >
                      Editar
                    </Button>
                    <Dialog open={openModal} onClose={handleCloseModal}>
                      <DialogTitle>Editar Empresa</DialogTitle>
                      <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                        <Grid item xs={12} lg={12}>
                          <BaseCard title="Editar Empresa">
                            <>
                              <Stack spacing={3}>
                                {/* Selector de Empresa */}
                                <TextField
                                  id="nombre"
                                  label="Nombre"
                                  variant="outlined"
                                  fullWidth
                                />

                                {/* Campo de Domicilio */}
                                <TextField
                                  id="domicilio"
                                  label="Domicilio"
                                  variant="outlined"
                                  fullWidth
                                />

                                {/* Campo de Telefono */}
                                <TextField
                                  id="telefono"
                                  label="Telefono"
                                  variant="outlined"
                                  fullWidth
                                />

                                {/* Campo de Correo */}
                                <TextField
                                  id="email"
                                  label="Correo"
                                  variant="outlined"
                                  fullWidth
                                />

                                {/* Selector de Tipo Empresa */}
                                <FormControl fullWidth>
                                  <InputLabel id="modelo-label">Tipo de Empresa</InputLabel>
                                  <Select
                                    labelId="tipoempresa-label"
                                    id="tipoempresa"
                                    label="TipoEmpresa"
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
                              <Button>
                                Confirmar Edición
                              </Button>
                            </>
                          </BaseCard>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
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