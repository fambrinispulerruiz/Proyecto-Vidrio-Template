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

interface Vidrio {
  activo: boolean;
  antena: string;
  codigo: string;
  id: number;
  modelo: {
    title: string;
  };
  nombre: string;
  precio: number;
  sensor: string;
  tipoVidrio: string;
  version: number;
}


const NuevoFormulario = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState<Vidrio[]>([]);


  useEffect(() => {
    // This function will be called when the component mounts
    const fetchData = async () => {
      try {
        const username = 'sven';
        const password = 'pass';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        const response = await fetch("http://localhost:8080/restful/services/simple.Vidrios/actions/verVidrios/invoke", {
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
        setRows(data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleEditClick = () => {
    setOpenModal(true);
  };


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleExportToPDF = () => {
    // Implementa la lógica de exportación a PDF
    // ...

    // Ejemplo de apertura de la URL en una nueva ventana/tab
    // window.open(pdfExportURL, '_blank');
  };

  const tipoVidrio = [
    { id: '1', nombre: 'Parabrisa' },
    { id: '2', nombre: 'Luneta' },
    { id: '3', nombre: 'Puerta Delantera D' },
    { id: '4', nombre: 'Puerta Delantera I' },
    { id: '5', nombre: 'Puerta Trasera D' },
    { id: '6', nombre: 'Puerta Trasera I' },
    { id: '7', nombre: 'Espejo Lateral D' },
    { id: '8', nombre: 'Espejo Lateral I' },
    // Agrega más empresas según sea necesario
  ];

  const antena = [
    { id: '1', nombre: 'Si' },
    { id: '2', nombre: 'No' },
    // Agrega más empresas según sea necesario
  ];

  const sensor = [
    { id: '1', nombre: 'Si' },
    { id: '2', nombre: 'No' },
    // Agrega más empresas según sea necesario
  ];


  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenModal}>
            Agregar Vidrio
          </Button>
          <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
            Exportar a PDF
          </Button>
        </Box>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Agregar Vidrio</DialogTitle>
          <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Complete el Formulario de Vidrio">
                <>
                  <Stack spacing={3}>

                    {/* Campo de Nombre Vidrio */}
                    <TextField
                      id="nombre"
                      label="Nombre"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Codigo */}
                    <TextField
                      id="codigo"
                      label="Codigo"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Precio */}
                    <TextField
                      id="precio"
                      label="Precio"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Selector de Tipo Vidrio */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">Tipo de Vidrio</InputLabel>
                      <Select
                        labelId="tipovidrio-label"
                        id="tipovidrio"
                        label="TipoVidrio"
                      >
                        {tipoVidrio.map((tipoVidrio) => (
                          <MenuItem key={tipoVidrio.id} value={tipoVidrio.id}>
                            {tipoVidrio.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Selector de Antena */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">¿Posee antena para parabrisas?</InputLabel>
                      <Select
                        labelId="antena-label"
                        id="antena"
                        label="Antena"
                      >
                        {antena.map((antena) => (
                          <MenuItem key={antena.id} value={antena.id}>
                            {antena.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                      {/* Selector de Sensor */}
                      <FormControl fullWidth>
                      <InputLabel id="modelo-label">¿Posee sensor de lluvia?</InputLabel>
                      <Select
                        labelId="sensor-label"
                        id="sensor"
                        label="Sensor"
                      >
                        {sensor.map((sensor) => (
                          <MenuItem key={sensor.id} value={sensor.id}>
                            {sensor.nombre}
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
        <BaseCard title="Vidrios">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Codigo</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Tipo Vidrio</TableCell>
                <TableCell>Atena</TableCell>
                <TableCell>Sensor</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.modelo.title}</TableCell>
                  <TableCell>{row.codigo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>{row.tipoVidrio}</TableCell>
                  <TableCell>{row.antena}</TableCell>
                  <TableCell>{row.sensor}</TableCell>
                  <TableCell>
                  <Button
                      startIcon={<EditIcon />}
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Editar
                    </Button> <Dialog open={openModal} onClose={handleCloseModal}>
                      <DialogTitle>Editar Vidrio</DialogTitle>
                      <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                        <Grid item xs={12} lg={12}>
                          <BaseCard title="Editar Vidrio">
                            <>
                              <Stack spacing={3}>
                                {/* Selector de Modelo */}
                                <TextField
                      id="nombre"
                      label="Nombre"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Codigo */}
                    <TextField
                      id="codigo"
                      label="Codigo"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Campo de Precio */}
                    <TextField
                      id="precio"
                      label="Precio"
                      variant="outlined"
                      fullWidth
                    />

                    {/* Selector de Tipo Vidrio */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">Tipo de Vidrio</InputLabel>
                      <Select
                        labelId="tipovidrio-label"
                        id="tipovidrio"
                        label="TipoVidrio"
                      >
                        {tipoVidrio.map((tipoVidrio) => (
                          <MenuItem key={tipoVidrio.id} value={tipoVidrio.id}>
                            {tipoVidrio.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Selector de Antena */}
                    <FormControl fullWidth>
                      <InputLabel id="modelo-label">¿Posee antena para parabrisas?</InputLabel>
                      <Select
                        labelId="antena-label"
                        id="antena"
                        label="Antena"
                      >
                        {antena.map((antena) => (
                          <MenuItem key={antena.id} value={antena.id}>
                            {antena.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                      {/* Selector de Sensor */}
                      <FormControl fullWidth>
                      <InputLabel id="modelo-label">¿Posee sensor de lluvia?</InputLabel>
                      <Select
                        labelId="sensor-label"
                        id="sensor"
                        label="Sensor"
                      >
                        {sensor.map((sensor) => (
                          <MenuItem key={sensor.id} value={sensor.id}>
                            {sensor.nombre}
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