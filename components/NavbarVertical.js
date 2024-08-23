"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function NavbarVertical() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    // Add your account deletion logic here
    console.log("Account deleted!");
    setDialogOpen(false); // Close the dialog after deletion
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="white"
      mx={3}
      alignItems="center"
      paddingTop={1.5}
      paddingBottom={1}
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="h6"
          letterSpacing="5px"
          marginRight={2}
          sx={{ fontSize: { xs: 20, sm: 27 } }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            LEONSI
          </a>
        </Typography>
        <Typography
          variant="subtitle1"
          fontStyle="italic"
          sx={{ fontSize: { xs: 13, sm: 17 } }}
        >
          ai-powered storytelling
        </Typography>
      </Box>
      {/* Show Drawer Toggle Icon on All Screens */}
      <IconButton onClick={toggleDrawer} color="inherit">
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "#0C0D1A",
            color: "white",
            width: "250px",
            display: "flex", // Make Drawer a flex container
            flexDirection: "column", // Arrange children in a column
            justifyContent: "space-between", // Space out items, "Delete Account" goes to the bottom
          },
        }}
      >
        <List>
          <Typography
            variant="h6"
            letterSpacing="5px"
            ml={2}
            mt={5}
            mb={10}
            sx={{ fontSize: { xs: 15, sm: 20 } }}
          >
            <hr
              style={{
                marginRight: "20px",
                borderColor: "#116C93",
                borderWidth: "2px",
                marginBottom: "15px",
                marginLeft: "130px",
              }}
            />
            Welcome Back!
            <hr
              style={{
                marginTop: "15px",
                marginRight: "150px",
                borderColor: "#116C93",
                borderWidth: "2px",
              }}
            />
          </Typography>
          <ListItem
            button
            component="a"
            href="/"
            sx={{
              "&:hover": {
                backgroundColor: "#116C93",
                color: "white",
              },
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/chatbot"
            sx={{
              "&:hover": {
                backgroundColor: "#116C93",
                color: "white",
              },
            }}
          >
            <ListItemText primary="Story Generation" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/"
            sx={{
              "&:hover": {
                backgroundColor: "#116C93",
                color: "white",
              },
            }}
          >
            <ListItemText primary="Log out" />
          </ListItem>
        </List>

        <ListItem
          button
          onClick={handleDialogOpen} // Open the dialog when clicked
          sx={{
            mt: "auto", // Pushes this item to the bottom
            "&:hover": {
              backgroundColor: "#FF0000",
              color: "white",
            },
          }}
        >
          <ListItemText primary="Delete Account" />
        </ListItem>
      </Drawer>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NavbarVertical;
