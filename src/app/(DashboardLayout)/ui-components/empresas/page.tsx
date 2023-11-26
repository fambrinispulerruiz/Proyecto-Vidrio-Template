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

  const tipoEmpresa = [
    { id: '1', nombre: 'Cliente' },
    { id: '2', nombre: 'Proveedor' },
    // Agrega más empresas según sea necesario
  ];

  // Asumiendo que la propiedad 'empresa' en 'row' contiene el id de la empresa asociada al modelo
  const rows = [
    { id: '1', nombre: 'Mecánica Veloz S.A.', domicilio: 'Av. de los Talleres 123', telefono: '555-1234-5678', correo: 'info@mecanicaveloz.com', tipoEmpresa: '1' },
    { id: '2', nombre: 'Autotec Reparaciones', domicilio: 'Av. San Martin', telefono: '555-8765-4321', correo: 'contacto@autotecreparaciones.com', tipoEmpresa: '2' },
    { id: '3', nombre: 'ServiMotor Express', domicilio: 'Julio Argentino Roca 344', telefono: '555-2345-6789', correo: 'servimotorexpress@gmail.com', tipoEmpresa: '1' },
    { id: '4', nombre: 'Talleres Automotrices Rueda Libre', domicilio: 'Bouquet Roldán 450', telefono: '555-9876-5432', correo: 'talleresruedalibre@hotmail.com', tipoEmpresa: '2' },
    // Agrega más modelos según sea necesario
  ];

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
                        {tipoEmpresa.map((tipoEmpresa) => (
                          <MenuItem key={tipoEmpresa.id} value={tipoEmpresa.id}>
                            {tipoEmpresa.nombre}
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
                <TableCell>Domicilio</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.domicilio}</TableCell>
                  <TableCell>{row.telefono}</TableCell>
                  <TableCell>{row.correo}</TableCell>
                  <TableCell>
                    {/* Busca la empresa correspondiente al id en 'row.empresa' */}
                    {tipoEmpresa.find((tipoEmpresa) => tipoEmpresa.id === row.tipoEmpresa)?.nombre}
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