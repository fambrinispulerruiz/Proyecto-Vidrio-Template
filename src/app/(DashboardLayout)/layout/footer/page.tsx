'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        © 2023 El Emporio del Vidrio{" "}
        {/* <Link href="https://www.wrappixel.com">
          Wrappixel.com
        </Link>{" "} */}
      </Typography>
    </Box>
  );
};

export default Footer;
    