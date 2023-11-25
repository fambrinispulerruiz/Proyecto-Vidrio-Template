import React from "react";
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
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {product.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {product.name}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {product.post}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: product.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={product.priority}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{product.budget}</Typography>
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
