"use client";
import NavbarHorizontal from "../../../components/NavbarHorizontal";
import Link from "@mui/material/Link";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          Leonsi
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }
  return (
    <Box>
      <NavbarHorizontal></NavbarHorizontal>
      <Copyright sx={{ color: "white" }} />
    </Box>
  );
}
