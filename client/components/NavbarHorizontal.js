"use client";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function NavbarHorizontal() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="white"
      mx={3}
      alignItems="center"
      paddingTop={1.5}
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="title"
          fontSize="27px"
          letterSpacing="5px"
          marginRight={2}
        >
          <a href="/">LEONSI</a>
        </Typography>
        <Typography variant="krub" fontStyle="italic">
          ai-powered storytelling
        </Typography>
      </Box>
      <Box width="23%" display="flex" justifyContent="space-between">
        <Typography variant="krub">
          <a href="/dashboard">dashboard</a>
        </Typography>
        <Typography variant="krub">
          <a href="/signup">sign up</a>
        </Typography>
        <Typography variant="krub">
          <a href="/login">login</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default NavbarHorizontal;
