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

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "", // Add the api end-point here
  });

  const messageEndRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior (e.g., adding a new line)
      buttonRef.current?.click(); // Simulate button click
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box padding={3}>
      <Box
        mt={2}
        mb={3}
        sx={{
          maxWidth: "700px",
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
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Enables vertical scrolling
            mb: 2,
            paddingRight: "10px", // Adds some padding for better UX with the scrollbar
          }}
        >
          {messages.length !== 0 ? (
            <Box className="pb-4 pt-2 space-y-5">
              {messages.map((message) => (
                <Box
                  key={message.id}
                  className="w-full"
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.role === "user" ? (
                    <Box className="flex gap-x-2">
                      <Typography
                        className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm"
                        sx={{
                          pt: 1,
                          pb: 1,
                          pl: 2,
                          pr: 2,
                          m: 1,
                          backgroundColor: "#181932",
                          borderRadius: "18px",
                          color: "#D5D5D5",
                          textAlign: "left",
                          border: "1px solid #1C6090",
                          backgroundColor: "#1F1F2E", // Background color for contrast
                        }}
                      >
                        {message.content}
                      </Typography>
                      <Box className="bg-gray-500 h-10 w-10 rounded-lg">
                        {/* User icon */}
                      </Box>
                    </Box>
                  ) : (
                    <Box className="flex gap-x-2">
                      <Box className="bg-teal-500 h-10 w-10 rounded-lg">
                        {/* Bot icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-full h-full text-white p-1"
                        >
                          <path d="M16.5 7.5h-9v9h9v-9z" />
                          <path
                            fillRule="evenodd"
                            d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Box>
                      <Typography
                        className="rounded-lg p-3 w-full border-teal-500 border-2 text-sm"
                        sx={{
                          pt: 3,
                          pb: 3,
                          pl: 2,
                          pr: 2,
                          m: 1,
                          backgroundColor: "#181932",
                          borderRadius: "18px",
                          color: "#D5D5D5",
                          textAlign: "left",
                          border: "1px solid #1C902F",
                          backgroundColor: "#1F1F2E",
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography color="grey" align="center">
              No messages yet. Start your story now!
            </Typography>
          )}

          <div ref={messageEndRef}></div>
        </Box>

        {/* Input Field and Send Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderTop: "1px solid #1C6090",
            pt: 2,
          }}
        >
          <TextField
            placeholder="Give some context, receive a story"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Add key down handler
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    ref={buttonRef} // Assign ref to the button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      color: "white",
                      backgroundColor: "#116C93",
                      "&:hover": {
                        backgroundColor: "#105D7E",
                      },
                      padding: "6px 16px",
                      minWidth: "80px",
                      borderRadius: "25px",
                      textTransform: "none",
                    }}
                  >
                    Generate
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#141527",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                "& fieldset": {
                  borderColor: "#1C6090",
                  borderRadius: "25px",
                },
                "&:hover fieldset": {
                  borderColor: "#1C6090",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1C6090",
                  boxShadow:
                    "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)",
                  borderRadius: "25px",
                },
                "&.Mui-focused": {
                  boxShadow:
                    "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)",
                  borderRadius: "25px",
                },
                color: "#D5D5D5",
              },
              "& .MuiInputBase-input": {
                fontSize: "12px",
                color: "#D5D5D5",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "12px",
                color: "#D5D5D5",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
