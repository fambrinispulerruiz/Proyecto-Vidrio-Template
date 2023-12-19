import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Button,
  TableRow,
  Chip,
  TableContainer,
  Dialog,
  Grid, Stack, DialogTitle, DialogContent, DialogActions,
  Checkbox,
  FormControlLabel, TextField
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import EditIcon from '@mui/icons-material/Edit';

interface OrdenDeTrabajo {
  id: number;
  nombreAsegurado: string;
  patente: string;
  estado: string;
  propio: string;
  aseguradora: string;
  fecha: string;
  telefonoAsegurado: string;
  observaciones: string;
  vidrio: {
    title: string;
  };
  vidrio_nombre: string;
  nro_siniestro: string;
}


const ProductPerfomance = () => {

  const [rows, setRows] = useState<OrdenDeTrabajo[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedEstadoId, setSelectedEstadoId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    nombreAsegurado: '',
    patente: '',
    estado: '',
    propio: '',
    aseguradora: '',
    fecha: '',
    hora: '',
    telefonoAsegurado: '',
    vidrio_id: '',
    vidrio_nombre: '',
    nro_siniestro: '',
    orden: '',
    observaciones: ''
  });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(null);



  useEffect(() => {
    // This function will be called when the component mounts
    const fetchData = async () => {
      try {
        const username = 'sven';
        const password = 'pass';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        const response = await fetch("http://localhost:8080/restful/services/simple.OrdenDeTrabajos/actions/verOrdenesDeTrabajo/invoke", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
          },
        });

        const data = await response.json();

        const sortedData = data.sort((a: { estado: string }, b: { estado: string }) => {
          const estadoOrder: { [key: string]: number } = {
            'Sin Atender': 1,
            'Atendido': 2,
            'Finalizado Y Entregado': 3,
          };
          return estadoOrder[a.estado] - estadoOrder[b.estado];
        });


        // Set the sorted data to the 'rows' state
        setRows(sortedData);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const getColorForEstado = (estado: string) => {
    switch (estado) {
      case 'Sin Atender':
        return "error.main"; // o el color que desees para Sin atender
      case 'Atendido':
        return "primary.main"; // o el color que desees para Atendido
      case 'Finalizado Y Entregado':
        return "success.main"; // o el color que desees para Atendido y Finalizado
      default:
        return ''; // o el color por defecto si el estado no coincide con ninguno de los anteriores
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenEditModal = async (row: OrdenDeTrabajo) => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/restful/objects/simple.OrdenDeTrabajo/${row.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;profile="urn:org.apache.isis"',
          'Authorization': authHeader,
          'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all'
        },
      });

      if (response.ok) {
        const ordenData = await response.json();

        const vidrioID = ordenData.vidrio.href.split('/').pop();

        // Actualiza el estado con los datos que trae el fetch
        setFormData({
          id: ordenData.id,
          nombreAsegurado: ordenData.nombreAsegurado,
          patente: ordenData.patente,
          estado: ordenData.estado,
          propio: ordenData.propio,
          aseguradora: ordenData.aseguradora,
          fecha: ordenData.fecha,
          hora: ordenData.fecha,
          telefonoAsegurado: ordenData.telefonoAsegurado,
          vidrio_id: vidrioID,
          vidrio_nombre: ordenData.vidrio.title,
          nro_siniestro: ordenData.nroSiniestro,
          orden: ordenData.orden,
          observaciones: ordenData.observaciones
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

  const abrirModal = (idOrden: string) => {
    setModalAbierto(true);
    setSelectedEstadoId(idOrden);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const handleCambioEstado = (nuevoEstado: string) => {
    // Aquí puedes realizar el fetch para actualizar el estado en el backend
    // y luego cerrar el modal si es necesario.
    console.log(nuevoEstado)
    setEstadoSeleccionado(nuevoEstado);
  };

  const handleAceptar = async (nuevoEstado: string, idOrden: string | null) => {
    try {
      const username = 'sven';
      const password = 'pass';
      const authHeader = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(
        `http://localhost:8080/restful/objects/simple.OrdenDeTrabajo/${idOrden}/actions/cambiarEstadoDeLaOrden/invoke`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;profile="urn:org.apache.isis"',
            'Authorization': authHeader,
            'accept': 'application/json;profile=urn:org.apache.isis/v2;suppress=all',
          },
          body: JSON.stringify({
            estado: { value: nuevoEstado }
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

  return (
    <BaseCard title="Historico de Ordenes">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Vidrio
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Asegurado
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Fecha
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Patente
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Estado
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {row.vidrio.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {row.nombreAsegurado}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {row.telefonoAsegurado}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {row.aseguradora}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography color="textSecondary" variant="h6">
                        {new Date(row.fecha).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {new Date(row.fecha).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {row.patente}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {row.propio}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: getColorForEstado(row.estado),
                      color: "#fff",
                    }}
                    size="small"
                    label={row.estado}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="secondary"
                    style={{ margin: '-10px' }}
                    onClick={() => handleOpenEditModal(row)}
                  >
                    Ver Datos
                  </Button>
                  <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                    <DialogTitle>Datos de la Orden</DialogTitle>
                    <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                      <Grid item xs={12} lg={12}>
                        <BaseCard title={"Orden #" + formData.id + ""}>
                          <>
                            <Stack spacing={3}>

                              {/* Selector de Vidrio */}

                              <TextField
                                id="vidrio"
                                label="Vidrio a colocar"
                                value={formData.vidrio_nombre}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Campo de Fecha */}
                              <TextField
                                id="fecha"
                                label="Fecha de realización"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={formData.fecha ? formData.fecha.split(' ')[0] : ''}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Input para la hora */}
                              <TextField
                                id="hora"
                                label="Hora"
                                type="time"
                                variant="outlined"
                                fullWidth
                                value={formData.hora ? formData.hora.split(' ')[1] : ''}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />


                              {/* Campo de Nombre Asegurado */}
                              <TextField
                                id="nombreAsegurado"
                                label="Nombre del Asegurado"
                                variant="outlined"
                                fullWidth
                                value={formData.nombreAsegurado}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Campo de Teléfono Asegurado */}
                              <TextField
                                id="telefonoAsegurado"
                                label="Teléfono del Asegurado"
                                variant="outlined"
                                fullWidth
                                value={formData.telefonoAsegurado}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Selector de Aseguradora */}
                              <TextField fullWidth
                                id="aseguradora"
                                label="Aseguradora"
                                name="aseguradora"
                                value={formData.aseguradora}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Campo de Nro Siniestro */}
                              <TextField
                                id="nroSiniestro"
                                label="Nro Siniestro"
                                variant="outlined"
                                fullWidth
                                value={formData.nro_siniestro}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Checkbox de Orden */}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={formData.orden === "Si"}
                                    inputProps={{
                                      readOnly: true,
                                      style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                    }}
                                  />
                                }
                                label="¿Trae orden del seguro?"
                              />


                              {/* Campo de Patente */}
                              <TextField
                                id="patente"
                                label="Patente"
                                variant="outlined"
                                fullWidth
                                value={formData.patente}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Selector de Propio */}
                              <TextField fullWidth
                                id="propio"
                                label="Vehiculo"
                                variant="outlined"
                                value={formData.propio}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Campo de Observaciones */}
                              <TextField
                                id="observaciones"
                                label="Observaciones"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={formData.observaciones}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />

                              {/* Selector de Estado */}
                              <TextField fullWidth
                                id="estado"
                                label="Estado de la Orden"
                                value={formData.estado}
                                InputProps={{
                                  readOnly: true,
                                  style: { color: 'darkslategray', backgroundColor: '#f2f2f2', cursor: 'not-allowed' },
                                }}
                              />
                            </Stack>
                            <br />
                            <Button
                              startIcon={<EditIcon />}
                              color="secondary"
                              onClick={() => abrirModal(formData.id)}
                            >
                              Cambiar Estado de la Orden
                            </Button>
                            <Dialog open={modalAbierto} onClose={cerrarModal}>
                              <DialogTitle>Datos de la Orden</DialogTitle>
                              <DialogContent>
                                <Grid>
                                  <BaseCard title={"Cambiar Estado"}>
                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                      {/* Botones en el modal */}
                                      <Button onClick={() => handleCambioEstado('Sin_Atender')}
                                        color="secondary"
                                        variant={estadoSeleccionado === 'Sin_Atender' ? 'contained' : 'outlined'}
                                        style={{ marginBottom: '10px' }}
                                      >Sin Atender</Button>
                                      <br></br>
                                      <Button onClick={() => handleCambioEstado('Atendido')} color="warning"
                                        variant={estadoSeleccionado === 'Atendido' ? 'contained' : 'outlined'}
                                        style={{ marginBottom: '10px' }}
                                      >Atendido</Button>
                                      <br></br>
                                      <Button onClick={() => handleCambioEstado('Finalizado_y_Entregado')} color="success"
                                        variant={estadoSeleccionado === 'Finalizado_y_Entregado' ? 'contained' : 'outlined'}
                                        style={{ marginBottom: '10px' }}
                                      >Finalizado y Entregado</Button>
                                    </div>
                                  </BaseCard>
                                </Grid>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => estadoSeleccionado !== null && handleAceptar(estadoSeleccionado, selectedEstadoId)}>Aceptar</Button>
                                <Button onClick={cerrarModal}>Cancelar</Button>
                              </DialogActions>
                            </Dialog>
                          </>
                        </BaseCard>
                      </Grid >
                    </DialogContent >
                    <DialogActions>
                      <Button onClick={handleCloseEditModal}>Cerrar</Button>
                    </DialogActions>
                  </Dialog >
                </TableCell >
              </TableRow >
            ))}
          </TableBody >
        </Table >
      </TableContainer >
    </BaseCard >
  );
};

export default ProductPerfomance;
