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

  const empresas = [
    { id: '1', nombre: 'Toyota' },
    { id: '2', nombre: 'Honda' },
    { id: '3', nombre: 'BMW' },
    // Agrega más empresas según sea necesario
  ];

  // Asumiendo que la propiedad 'empresa' en 'row' contiene el id de la empresa asociada al modelo
  const rows = [
    { id: '1', nombre: 'Hilux', empresa: '1' },
    { id: '2', nombre: 'Civic', empresa: '2' },
    { id: '3', nombre: '3 Series', empresa: '3' },
    { id: '4', nombre: 'Camry', empresa: '1' },
    { id: '5', nombre: 'Accord', empresa: '2' },
    // Agrega más modelos según sea necesario
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
          <DialogTitle>Agregar Orden</DialogTitle>
          <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Complete el Formulario de la Orden">
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
                  <TableCell>
                    {/* Busca la empresa correspondiente al id en 'row.empresa' */}
                    {empresas.find((empresa) => empresa.id === row.empresa)?.nombre}
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
