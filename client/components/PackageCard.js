import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

function PackageCard(props) {
  return (
    <Card
      variant="outlined"
      m={2}
      sx={{
        width: "350px",
        backgroundColor: "#181932",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minHeight: "220px",
      }}
    >
      <CardContent
        sx={{
          color: "white",
          padding: "15px",
          flexGrow: 1,
        }}
      >
        <Typography fontSize={25}>{props.title}</Typography>
        <Typography fontSize={18} textAlign="center">
          ${props.price}/month
        </Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#116C93", margin: "auto" }}
        >
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}

export default PackageCard;
