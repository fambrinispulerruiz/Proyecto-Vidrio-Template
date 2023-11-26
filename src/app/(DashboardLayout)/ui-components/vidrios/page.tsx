'use client';
import { useState } from 'react';
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


const NuevoFormulario = () => {
  const [openModal, setOpenModal] = useState(false);

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

  // Asumiendo que la propiedad 'empresa' en 'row' contiene el id de la empresa asociada al modelo
  const rows = [
    { id: '1', nombre: 'Protector Solar', codigo: 'VPA-2023-001', precio: 15000, tipoVidrio: '1', antena: '1', sensor: '1' },
    { id: '2', nombre: 'Seguridad Plus', codigo: 'VSP-2023-002', precio: 20000, tipoVidrio: '2', antena: '2', sensor: '2' },
    { id: '3', nombre: 'Ultra Claro', codigo: 'VUC-2023-003', precio: 18000, tipoVidrio: '3', antena: '1', sensor: '1' },
    { id: '4', nombre: 'Resistente Impactos', codigo: 'VRI-2023-004', precio: 22000, tipoVidrio: '4', antena: '2', sensor: '2' },
    // Agrega más modelos según sea necesario
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
                      <InputLabel id="modelo-label">Antena</InputLabel>
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
                      <InputLabel id="modelo-label">Sensor</InputLabel>
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
        <BaseCard title="Empresas">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
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
                  <TableCell>{row.codigo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>
                    {/* Busca la empresa correspondiente al id en 'row.empresa' */}
                    {tipoVidrio.find((tipoVidrio) => tipoVidrio.id === row.tipoVidrio)?.nombre}
                  </TableCell>
                  <TableCell>
                    {/* Busca la empresa correspondiente al id en 'row.empresa' */}
                    {antena.find((antena) => antena.id === row.antena)?.nombre}
                  </TableCell>
                  <TableCell>
                    {/* Busca la empresa correspondiente al id en 'row.empresa' */}
                    {sensor.find((sensor) => sensor.id === row.sensor)?.nombre}
                  </TableCell>
                  <TableCell>
                    <Button startIcon={<EditIcon />} color="primary">
                      Editar
                    </Button>
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