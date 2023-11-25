'use client'
import React, { useState } from 'react';
import {
  Button, Dialog, Stack,
  TextField, DialogTitle, DialogContent, DialogActions, Grid, Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import DailyActivity from '@/app/(DashboardLayout)/components/dashboard/DailyActivity';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { red } from '@mui/material/colors';


const Dashboard = () => {

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleExportToPDF = () => {
    // Agrega la URL específica para exportar a PDF
    const pdfExportURL = 'tu_url_para_exportar_a_pdf';

    // Realiza el fetch vacío para iniciar la exportación
    fetch(pdfExportURL, {
      method: 'GET', // O el método HTTP que corresponda
      // Agrega cualquier encabezado o configuración necesario para tu API
      headers: {
        'Content-Type': 'application/pdf',
        // Puedes agregar más encabezados según tus requisitos
      },
    })
      .then(response => {
        // Verifica el estado de la respuesta
        if (!response.ok) {
          throw new Error('Error al exportar a PDF');
        }
        // Puedes manejar la respuesta aquí si es necesario
        // Por ejemplo, abrir el PDF en una nueva ventana/tab
        window.open(pdfExportURL, '_blank');
      })
      .catch(error => {
        console.error('Error:', error.message);
        // Maneja los errores según tus necesidades
      });
  };


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenModal}>
                Agregar Orden
              </Button>
              <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] }  }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
                Exportar a PDF
              </Button>
            </Box>
            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Agregar Orden</DialogTitle>
              <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                <Grid item xs={12} lg={12}>
                  <BaseCard title="Complete el Formulario de la Orden">
                    <>
                      <Stack spacing={3}>
                        {/* Selector de Modelo */}
                        <FormControl fullWidth>
                          <InputLabel id="modelo-label">Modelo</InputLabel>
                          <Select
                            labelId="modelo-label"
                            id="modelo"
                            label="Modelo"
                          >
                            <MenuItem value="hilux">Hilux (Toyota)</MenuItem>
                            <MenuItem value="accord">Accord (Honda)</MenuItem>
                            <MenuItem value="3-series">3 Series (BMW)</MenuItem>
                            <MenuItem value="camry">Camry (Toyota)</MenuItem>
                            <MenuItem value="civic">Civic (Honda)</MenuItem>
                            {/* Agrega más opciones según sea necesario */}
                          </Select>
                        </FormControl>

                        {/* Selector de Vidrio */}
                        <FormControl fullWidth>
                          <InputLabel id="vidrio-label">Vidrio</InputLabel>
                          <Select
                            labelId="vidrio-label"
                            id="vidrio"
                            label="Vidrio"
                          >
                            <MenuItem value="parabrisas">Parabrisas</MenuItem>
                            <MenuItem value="luneta">Luneta</MenuItem>
                            <MenuItem value="ventana_delantera">Ventana Delantera</MenuItem>
                            <MenuItem value="ventana_trasera">Ventana Trasera</MenuItem>
                            <MenuItem value="ventana_lateral">Ventana Lateral</MenuItem>
                            {/* Agrega más opciones según sea necesario */}
                          </Select>
                        </FormControl>

                        {/* Campo de Fecha */}
                        <TextField
                          id="fecha"
                          label="Fecha"
                          type="date"
                          variant="outlined"
                          fullWidth
                        />

                        {/* Campo de Nombre Asegurado */}
                        <TextField
                          id="nombre-asegurado"
                          label="Nombre Asegurado"
                          variant="outlined"
                          fullWidth
                        />

                        {/* Campo de Teléfono Asegurado */}
                        <TextField
                          id="telefono-asegurado"
                          label="Teléfono Asegurado"
                          variant="outlined"
                          fullWidth
                        />

                        {/* Selector de Aseguradora */}
                        <FormControl fullWidth>
                          <InputLabel id="aseguradora-label">Aseguradora</InputLabel>
                          <Select
                            labelId="aseguradora-label"
                            id="aseguradora"
                            label="Aseguradora"
                          >
                            <MenuItem value="zurich">Zurich</MenuItem>
                            <MenuItem value="federacion_patronal">Federación Patronal</MenuItem>
                            <MenuItem value="la_segunda">La Segunda</MenuItem>
                            <MenuItem value="sancor">Sancor</MenuItem>
                            <MenuItem value="mapfre">MAPFRE</MenuItem>
                            {/* Agrega más opciones según sea necesario */}
                          </Select>
                        </FormControl>

                        {/* Campo de Nro Siniestro */}
                        <TextField
                          id="nro-siniestro"
                          label="Nro Siniestro"
                          variant="outlined"
                          fullWidth
                        />

                        {/* Checkbox de Orden */}
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Orden"
                        />

                        {/* Campo de Patente */}
                        <TextField
                          id="patente"
                          label="Patente"
                          variant="outlined"
                          fullWidth
                        />

                        {/* Selector de Propio */}
                        <FormControl fullWidth>
                          <InputLabel id="propio-label">Propio</InputLabel>
                          <Select
                            labelId="propio-label"
                            id="propio"
                            label="Propio"
                          >
                            <MenuItem value="propio">Propio</MenuItem>
                            <MenuItem value="laboral">Laboral</MenuItem>
                          </Select>
                        </FormControl>

                        {/* Campo de Observaciones */}
                        <TextField
                          id="observaciones"
                          label="Observaciones"
                          multiline
                          rows={4}
                          variant="outlined"
                          fullWidth
                        />

                        {/* Selector de Estado */}
                        <FormControl fullWidth>
                          <InputLabel id="estado-label">Estado</InputLabel>
                          <Select
                            labelId="estado-label"
                            id="estado"
                            label="Estado"
                          >
                            <MenuItem value="estado1">Sin Atender</MenuItem>
                            <MenuItem value="estado2">Atendido</MenuItem>
                            <MenuItem value="estado2">Finalizado y Entregado</MenuItem>
                            {/* Agrega más opciones según sea necesario */}
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
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
