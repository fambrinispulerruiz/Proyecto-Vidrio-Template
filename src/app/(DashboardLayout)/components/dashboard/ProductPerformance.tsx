import React, {useState, useEffect} from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

interface OrdenDeTrabajo {
  id: number;
  nombreAsegurado: string;
  patente: string;
  estado: string;
  propio: string;
  aseguradora: string;
}

const products = [
  {
    id: "1",
    name: "Ruiz Giuliano",
    post: "Propio",
    pname: "AF001NJ",
    priority: "Finalizado",
    pbg: "success.main",
    budget: "La Segunda",
  },
  {
    id: "2",
    name: "Rodriguez Olga",
    post: "Laboral",
    pname: "AA123FA",
    priority: "Cancelado",
    pbg: "error.main",
    budget: "Rivadavia",
  },
  {
    id: "3",
    name: "Lauren Paola",
    post: "Propio",
    pname: "GRF465",
    priority: "Atendido",
    pbg: "primary.main",
    budget: "Federacion Patronal",
  },
  {
    id: "4",
    name: "Navarro Federico",
    post: "Propio",
    pname: "OPD698",
    priority: "Finalizado",
    pbg: "success.main",
    budget: "Zurich",
  },
];



const ProductPerfomance = () => {

  const [rows, setRows] = useState<OrdenDeTrabajo[]>([]);

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


  const getColorForEstado = (estado: string) => {
    switch (estado) {
      case 'Sin atender':
        return "error.main"; // o el color que desees para Sin atender
      case 'Atendido':
        return "primary.main"; // o el color que desees para Atendido
      case 'Finalizado y Entregado':
        return "success.main"; // o el color que desees para Atendido y Finalizado
      default:
        return ''; // o el color por defecto si el estado no coincide con ninguno de los anteriores
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
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Asegurado
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Patente
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Estado
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Aseguradora
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
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {row.nombreAsegurado}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {row.propio}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {row.patente}
                  </Typography>
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
                <TableCell align="right">
                  <Typography variant="h6">{row.aseguradora}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductPerfomance;
