"use client";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box height="100%">
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="rgba(24, 25, 50, .6)"
        alignItems="center"
        justifyContent="center"
        width="26%"
        height="85%"
        m={5}
        marginLeft={8}
        p={3}
        gap={2}
        borderRadius={15}
      >
        <Typography fontSize={25} textAlign="center" color="white">
          Sign up
        </Typography>
        <Stack my={2} gap={2}>
          <TextField
            size="small"
            sx={{
              color: "#D5D5D5",
              backgroundColor: "rgba(55, 57, 105, 0.5)",
              borderRadius: "20px",
              input: {
                color: "#D5D5D5",
              },
            }}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            size="small"
            sx={{
              backgroundColor: "rgba(55, 57, 105, 0.5)",
              borderRadius: "20px",
              input: {
                color: "#D5D5D5",
              },
            }}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Typography variant="krub" color="#D5D5D5">
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#116C93",
            width: "70%",
          }}
          onSubmit={handleSubmit}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
