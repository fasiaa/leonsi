"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

function NavbarHorizontal() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogOut = () => {
    localStorage.clear();
    router.push("/");
  }

  const isLoggedin = () => {
    try {
      const response = localStorage.getItem("email");

      if(response){
        return true;
      } else {
        return false;
      }
    } catch(error){
      return false;
    }
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="white"
      mx={3}
      alignItems="center"
      paddingTop={1.5}
      paddingBottom={1} // Add padding at the bottom for better spacing
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

      {/* Show Home Icon and Links on Larger Screens */}
      {!isSmallOrMediumScreen && (
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            gap={2} // Ensure there's space between the buttons
            alignItems="center"
          >
            <Button
              component="a"
              href="/"
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#116C93",
                  color: "white",
                  borderRadius: "4px",
                },
              }}
            >
              Home
            </Button>
            <Button
              component="a"
              href="/dashboard"
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#116C93",
                  color: "white",
                  borderRadius: "4px",
                },
              }}
            >
              Dashboard
            </Button>
            {!isLoggedin() && (
              <>
                <Button
                  component="a"
                  href="/signup"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#116C93",
                      color: "white",
                      borderRadius: "4px",
                    },
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  component="a"
                  href="/login"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#116C93",
                      color: "white",
                      borderRadius: "4px",
                    },
                  }}
                >
                  Login
                </Button>
              </>
            )}  
            {isLoggedin() && (
              <>
              <Button
                  component="a"
                  onClick={handleLogOut}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#116C93",
                      color: "white",
                      borderRadius: "4px",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}

      {/* Show Drawer on Smaller Screens */}
      {isSmallOrMediumScreen && (
        <>
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
              },
            }}
          >
            <List>
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
                href="/dashboard"
                sx={{
                  "&:hover": {
                    backgroundColor: "#116C93",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                component="a"
                href="/signup"
                sx={{
                  "&:hover": {
                    backgroundColor: "#116C93",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem
                button
                component="a"
                href="/login"
                sx={{
                  "&:hover": {
                    backgroundColor: "#116C93",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Drawer>
        </>
      )}
    </Box>
  );
}

export default NavbarHorizontal;
