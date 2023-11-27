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
import SweetAlert from "react-bootstrap-sweetalert";

interface Modelo {
  id: number;
  nombre: string;
  empresa: {
    title: string;
  }
  // Agrega otras propiedades según sea necesario
}

const NuevoFormulario = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState<Modelo[]>([]);

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

  const handleEditClick = () => {
    setOpenModal(true);
  };


  const empresas = [
    { id: '1', nombre: 'Toyota' },
    { id: '2', nombre: 'Honda' },
    { id: '3', nombre: 'BMW' },
    // Agrega más empresas según sea necesario
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleOpenModal}>
            Agregar Modelo
          </Button>
          <Button variant="contained" sx={{ margin: '20px', backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }} startIcon={<PictureAsPdfIcon />} onClick={handleExportToPDF} >
            Exportar a PDF
          </Button>
        </Box>
        <Dialog open={openModal} onClose={handleCloseModal}>
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
                        label="Empresa"
                      >
                        {empresas.map((empresa) => (
                          <MenuItem key={empresa.id} value={empresa.id}>
                            {empresa.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* Campo de Nombre Asegurado */}
                    <TextField
                      id="nombre"
                      label="Nombre"
                      variant="outlined"
                      fullWidth
                    />


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
        <BaseCard title="Modelos">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.empresa.title}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Editar
                    </Button> <Dialog open={openModal} onClose={handleCloseModal}>
                      <DialogTitle>Editar Modelo</DialogTitle>
                      <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                        <Grid item xs={12} lg={12}>
                          <BaseCard title="Editar Modelo">
                            <>
                              <Stack spacing={3}>
                                {/* Selector de Modelo */}
                                <FormControl fullWidth>
                                  <InputLabel id="empresa-label">Empresa</InputLabel>
                                  <Select
                                    labelId="empresa-label"
                                    id="empresa"
                                    label="Empresa"
                                  >
                                    {empresas.map((empresa) => (
                                      <MenuItem key={empresa.id} value={empresa.id}>
                                        {empresa.nombre}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                {/* Campo de Nombre Asegurado */}
                                <TextField
                                  id="nombre"
                                  label="Nombre"
                                  variant="outlined"
                                  fullWidth
                                />
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
