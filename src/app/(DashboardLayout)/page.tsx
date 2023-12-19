'use client'
import React, { useState, useEffect } from 'react';
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
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';


interface OrdenDeTrabajo {
  id: number;
  nombreAsegurado: string;
  patente: string;
  estado: string;
  propio: string;
  aseguradora: string;
  fecha: string;
  telefonoAsegurado: string;
  vidrio: {
    title: string;
  };
}

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


const Dashboard = () => {

  const [openModal, setOpenModal] = useState(false);
  const [vidrios, setSelect] = useState<Vidrio[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    nombreAsegurado: '',
    patente: '',
    estado: '',
    propio: '',
    nroSiniestro: '',
    aseguradora: '',
    fecha: '',
    orden: '',
    telefonoAsegurado: '',
    vidrio_id: '',
    observaciones: '',
    activo: ''
  });

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
        setSelect(data);

      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

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

      const fechaHora = `${fecha} ${hora}:00`;

      const response = await fetch(
        `http://localhost:8080/restful/objects/vidrios.Vidrio/${formData.vidrio_id}/actions/agregarOrden/invoke`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all',
          },
          body: JSON.stringify({
            nombreAsegurado: { value: formData.nombreAsegurado },
            patente: { value: formData.patente },
            estado: { value: formData.estado },
            propio: { value: formData.propio },
            nroSiniestro: { value: formData.nroSiniestro },
            aseguradora: { value: formData.aseguradora },
            fecha: { value: fechaHora },
            orden: { value: isChecked ? "Si" : "No" },
            telefonoAsegurado: { value: formData.telefonoAsegurado },
            observaciones: { value: formData.observaciones },
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


  const aseguradorasOptions = [
    { id: 'NO_POSEE', nombre: 'No posee' },
    { id: 'ALLIANZ', nombre: 'Allianz' },
    { id: 'SANCOR_SEGUROS', nombre: 'Sancor Seguros' },
    { id: 'LA_CAJA_SEGUROS', nombre: 'La Caja Seguros' },
    { id: 'MAPFRE', nombre: 'Mapfre' },
    { id: 'ZURICH', nombre: 'Zurich' },
    { id: 'PROVINCIA_SEGUROS', nombre: 'Provincia Seguros' },
    { id: 'QBE_SEGUROS_LA_BUENOS_AIRES', nombre: 'QBE Seguros La Buenos Aires' },
    { id: 'RIO_URUGUAY_SEGUROS', nombre: 'Río Uruguay Seguros' },
    { id: 'FEDERACION_PATRONAL', nombre: 'Federación Patronal' },
    { id: 'SAN_CRISTOBAL_SEGUROS', nombre: 'San Cristóbal Seguros' },
  ];

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleFechaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };
  
  const handleHoraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHora(event.target.value);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>


        <Grid container spacing={3}>
          {/* Primera Row: Botones */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenModal}>
                Agregar Orden
              </Button>
              <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF}>
                Exportar a PDF
              </Button>
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Agregar Orden</DialogTitle>
                <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                  <Grid item xs={12} lg={12}>
                    <BaseCard title="Complete los Datos de la Orden">
                      <>
                        <Stack spacing={3}>

                          {/* Selector de Vidrio */}
                          <FormControl fullWidth>
                            <InputLabel id="vidrio-label">Vidrio a colocar</InputLabel>
                            <Select
                              labelId="vidrio-label"
                              id="vidrio"
                              name="vidrio_id"
                              label="Vidrio"
                              value={formData.vidrio_id}
                              onChange={(event) =>
                                setFormData({ ...formData, vidrio_id: event.target.value })
                              }
                            >
                              {vidrios.map((vidrio) => (
                                <MenuItem key={vidrio.id} value={vidrio.id}>
                                  {vidrio.nombre + " (" + vidrio.modelo.title + ")"}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          {/* Campo de Fecha */}
                          <TextField
                            id="fecha"
                            label="Fecha de realización"
                            type="date"
                            name="fecha"
                            variant="outlined"
                            fullWidth
                            value={fecha}
                            onChange={handleFechaChange}
                          />

                          {/* Input para la hora */}
                          <TextField
                            id="hora"
                            label="Hora"
                            type="time"
                            variant="outlined"
                            fullWidth
                            value={hora}
                            onChange={handleHoraChange}
                          />

                          {/* Campo de Nombre Asegurado */}
                          <TextField
                            id="nombreAsegurado"
                            label="Nombre del Asegurado"
                            name="nombreAsegurado"
                            variant="outlined"
                            fullWidth
                            value={formData.nombreAsegurado}
                            onChange={handleFormChange}
                          />

                          {/* Campo de Teléfono Asegurado */}
                          <TextField
                            id="telefonoAsegurado"
                            label="Teléfono del Asegurado"
                            name="telefonoAsegurado"
                            variant="outlined"
                            fullWidth
                            value={formData.telefonoAsegurado}
                            onChange={handleFormChange}
                          />

                          {/* Selector de Aseguradora */}
                          <FormControl fullWidth>
                            <InputLabel id="aseguradora-label">Aseguradora</InputLabel>
                            <Select
                              labelId="aseguradora"
                              id="aseguradora"
                              label="Aseguradora"
                              name="aseguradora"
                              value={formData.aseguradora}
                              onChange={(event) =>
                                setFormData({ ...formData, aseguradora: event.target.value })
                              }
                            >
                              {aseguradorasOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          {/* Campo de Nro Siniestro */}
                          <TextField
                            id="nroSiniestro"
                            label="Nro Siniestro"
                            name="nroSiniestro"
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 'any' }}
                            fullWidth
                            value={formData.nroSiniestro}
                            onChange={handleFormChange}
                          />

                          {/* Checkbox de Orden */}
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label="¿Trae orden del seguro?"
                          />

                          {/* Campo de Patente */}
                          <TextField
                            id="patente"
                            label="Patente"
                            name="patente"
                            variant="outlined"
                            fullWidth
                            value={formData.patente}
                            onChange={handleFormChange}
                          />

                          {/* Selector de Propio */}
                          <FormControl fullWidth>
                            <InputLabel id="propio-label">Vehiculo</InputLabel>
                            <Select
                              labelId="propio-label"
                              id="propio"
                              label="Propio"
                              name="propio"
                              variant="outlined"
                              fullWidth
                              value={formData.propio}
                              onChange={handleFormChange}
                            >
                              <MenuItem value="Propio">Propio</MenuItem>
                              <MenuItem value="Laboral">Laboral</MenuItem>
                            </Select>
                          </FormControl>

                          {/* Campo de Observaciones */}
                          <TextField
                            id="observaciones"
                            label="Observaciones"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="observaciones"
                            fullWidth
                            value={formData.observaciones}
                            onChange={handleFormChange}
                          />

                          {/* Selector de Estado */}
                          <FormControl fullWidth>
                            <InputLabel id="estado-label">Estado de la Orden</InputLabel>
                            <Select
                              labelId="estado-label"
                              id="estado"
                              label="Estado"
                              name="estado"
                              value={formData.estado}
                              onChange={handleFormChange}
                            >
                              <MenuItem value="Sin_Atender">Sin Atender</MenuItem>
                              <MenuItem value="Atendido">Atendido</MenuItem>
                              <MenuItem value="Finalizado_y_Entregado">Finalizado y Entregado</MenuItem>
                              {/* Agrega más opciones según sea necesario */}
                            </Select>
                          </FormControl>
                        </Stack>
                        <br />
                        <Button onClick={handleFormSubmit}>
                          Cargar Orden
                        </Button>
                      </>
                    </BaseCard>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal}>Cancelar</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>

          {/* Segunda Row: Daily Activity y Sales Overview */}
          <Grid item xs={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={8}>
            <SalesOverview />
          </Grid>

          {/* Tercera Row: Product Performance */}
          <Grid item xs={12} lg={12}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
