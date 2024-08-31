"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useChat } from "ai/react";
import NavbarHorizontal from "../../../components/NavbarHorizontal";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function results(response){
    const router = useRouter();
    const [message, setMessage] = useState(response.searchParams.response);

    const handleSubmit = () => {
        router.push("/chatbot?response=" + message);
    }

    return (
        <Box>
            <NavbarHorizontal></NavbarHorizontal>
                <Box
                    mt={6}
                    mb={3}
                    overflow="auto"
                    gap={2}
                    sx={{
                        maxWidth: "90%",
                        mx: "auto",
                        p: 4,
                        backgroundColor: "#181932",
                        borderRadius: "18px",
                        boxShadow: "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)",
                        border: "1px solid #1C6090",
                        minHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        maxHeight: "80vh", // Set a max height for the box to limit the overall size
                    }}
                >
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="white"
                        >
                            Your Character
                        </Typography>
                    <Typography
                        variant="p"
                        textAlign="center"
                        color="white"
                        >
                            <ReactMarkdown>{message}</ReactMarkdown>
                            </Typography>
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
                        Continue
                    </Button>
                </Box>
        </Box>
    )
}