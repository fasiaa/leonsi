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

export default function CreateCharacter(){
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [facialFeatures, setFacialFeatures] = useState("");
    const [height, setHeight] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [hairLength, setHairLength] = useState("");
    const [hairStyle, setHairStyle] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [skinTone, setSkinTone] = useState("");
    const [personalityTraits, setPersonalityTraits] = useState("");
    const [goals, setGoals] = useState("");
    const [strengths, setStrengths] = useState("");
    const [weaknesses, setWeaknesses] = useState("");
    const [response, setResponse] = useState("");
    const router = useRouter();     

    const displayResults = (r) => {
        console.log(response)
        router.push('/results/'+"?response=" + r);
    }

    const handleSubmit = (event) => {
        const data_to_send = {character: {
            name: name,
            gender: gender,
            age: age,
            facialFeatures: facialFeatures,
            height: height,
            eyeColor: eyeColor,
            hairLength: hairLength,
            hairStyle: hairStyle,
            hairColor: hairColor,
            skinTone: skinTone,
            personalityTraits: personalityTraits,
            goals: goals,
            strengths: strengths,
            weaknesses: weaknesses
        }
        }

        const url = "https://flask-api-for-leonsi.vercel.app/api/generate-character-description"
        
        const headers = {
            'Content-Type': 'application/json',
        };
            
        axios.post(url, data_to_send, { headers }).then(response => {
          console.log('Response:', response.data.response);
          setResponse(response.data.response);
          displayResults(response.data.response);
        }).catch(error => {
          if (error.response) {
            console.error('Error response:', error);
          }
        });
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
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography
                        variant="h6"
                        textAlign="center"
                        color="white"
                        >
                            Let's Create Character
                        </Typography>  
                    <Typography
                        variant="p"
                        textAlign="center"
                        color="white"
                        >
                            Provide Details and Leave empty if none
                        </Typography>
                    </Box>
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
                        placeholder="Enter the character's name" fullWidth
                        value={name} // Bind the input to email state
                        onChange={(e) => setName(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's gender" fullWidth
                        value={gender} // Bind the input to email state
                        onChange={(e) => setGender(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's age" fullWidth
                        value={age} // Bind the input to email state
                        onChange={(e) => setAge(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's height" fullWidth
                        value={height} // Bind the input to email state
                        onChange={(e) => setHeight(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's eye color" fullWidth
                        value={eyeColor} // Bind the input to email state
                        onChange={(e) => setEyeColor(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's hair length" fullWidth
                        value={hairLength} // Bind the input to email state
                        onChange={(e) => setHairLength(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's hair style" fullWidth
                        value={hairStyle} // Bind the input to email state
                        onChange={(e) => setHairStyle(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's hair color" fullWidth
                        value={hairColor} // Bind the input to email state
                        onChange={(e) => setHairColor(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's skin tone" fullWidth
                        value={skinTone} // Bind the input to email state
                        onChange={(e) => setSkinTone(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's facial features" fullWidth
                        value={facialFeatures} // Bind the input to email state
                        onChange={(e) => setFacialFeatures(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's personality traits" fullWidth
                        value={personalityTraits} // Bind the input to email state
                        onChange={(e) => setPersonalityTraits(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's goals" fullWidth
                        value={goals} // Bind the input to email state
                        onChange={(e) => setGoals(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's strengths" fullWidth
                        value={strengths} // Bind the input to email state
                        onChange={(e) => setStrengths(e.target.value)} // Update email state
                        />
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
                        placeholder="Enter the character's weaknesses" fullWidth
                        value={weaknesses} // Bind the input to email state
                        onChange={(e) => setWeaknesses(e.target.value)} // Update email state
                        />
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
                        Let's Create
                    </Button>
                </Box>
        </Box>
    )
}