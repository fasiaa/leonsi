"use client";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    logInUser(email, password);
  };

  async function logInUser(enteredEmail, enteredPassword){
    const endpointURL = "https://flask-api-for-leonsi.vercel.app/api/login";

    const response = fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      router.push("/dashboard")
    } else {
      return (
        <>
          <Typography variant="h1" color="error">Incorrect Email or Password</Typography>
        </>
      )
    }
  }

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
          Log in
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
            type="password"  
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
            Don't have an account? <a href="/signup">Sign up</a>
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#116C93",
            width: "70%",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
