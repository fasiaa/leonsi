import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

function PackageCard(props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "100%", sm: "350px" }, // Full width on small screens, 350px on larger screens
        backgroundColor: "#181932", // Background color
        borderRadius: "5px", // Border radius
        boxShadow: "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)", // Box shadow
        border: "1px solid #1C6090", // Border color
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        m: 2,
        minHeight: "295px", // Minimum height to ensure consistency
      }}
    >
      <CardContent
        sx={{
          color: "white",
          padding: "15px",
          flexGrow: 1, // Allow content to grow and fill the available space
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Evenly distribute the content
        }}
      >
        <Typography fontSize={25}>{props.title}</Typography>
        <Typography fontSize={18} fontWeight="bold" textAlign="center">
          ${props.price}/month
        </Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center", // Center the button horizontally
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#116C93",
            "&:hover": {
              backgroundColor: "#0E577B", // Optional: darken on hover
            },
          }}
        >
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}

export default PackageCard;
