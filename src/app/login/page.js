"use client";

import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarHorizontal from "/components/NavbarHorizontal";
import Link from "@mui/material/Link";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for managing error messages
  const router = useRouter(); // Router for navigation

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

  const handleSubmit = (e) => {
    e.preventDefault();
    logInUser(email, password);
  };

  function logInUser(enteredEmail, enteredPassword){
    const dataToBeSent = {
      email: enteredEmail,
      password: enteredPassword,
    };
    const endpointURL = "https://flask-api-for-leonsi.vercel.app/api/login";

    const headers = {
      'Content-Type': 'application/json',
    };
    
    axios.post(endpointURL, dataToBeSent, { headers })
    .then(response => {
      console.log('Response:', response.data.response);
      if (response.data.response === "Incorrect Email or Password"){
        setIsWrong(true);
        setError("Incorrect Email or Password")
        return;
      } else if(response.data.response === "Login successful") {
        router.push("/dashboard")
      }
    })
    .catch(error => {
      if (error.response) {
        // The server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something else happened in setting up the request
        console.error('Error message:', error.message);
      }
    });
  }

  return (
    <Box width="100%" color="white">
      <NavbarHorizontal />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh" // Full viewport height
        padding={{ xs: 2, sm: 3, md: 5 }} // Responsive padding
        bgcolor="#0D0D1D" // Darker background color
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          backgroundColor="rgba(24, 25, 50, .6)" // Background color of the form
          alignItems="center"
          justifyContent="center"
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }} // Responsive width
          maxWidth="500px" // Max width for large screens
          height="auto"
          p={3}
          gap={2}
          borderRadius={10}
          sx={{
            boxShadow: `0 0 10px rgba(17, 108, 147, 0.8), 0 0 20px rgba(17, 108, 147, 0.6), 0 0 30px rgba(17, 108, 147, 0.4)`, // Neon blue glow effect
          }}
        >
          <Typography
            fontSize={{ xs: 20, sm: 25 }}
            textAlign="center"
            color="white"
          >
            Log in
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* Display error message */}
          <Stack my={2} gap={2} width="100%">
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
              fullWidth
              value={email} // Bind the input to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
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
              fullWidth
              type="password"
              value={password} // Bind the input to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <Typography variant="krub" color="#D5D5D5">
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "#D5D5D5" }}>
                Sign up
              </a>
            </Typography>
          </Stack>
          <Button
            type="submit" // Use type="submit" for form submission
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#116C93",
              width: "100%", // Full width of the container
              padding: "10px", // Padding inside the button
              "&:hover": {
                backgroundColor: "#0E577B", // Darken on hover
              },
            }}
          >
            Login
          </Button>
          <Copyright sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
}
