"use client";
import { Box, Typography, IconButton, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the arrow icon
import NavbarHorizontal from "../../components/NavbarHorizontal";
import PackageCard from "../../components/PackageCard";
import Link from "@mui/material/Link";
import { analytics } from "../../firebase";
import { useEffect } from "react";
import { logEvent } from "firebase/analytics";

export default function Home() {
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

  useEffect(()=>{
    if (analytics) {
      logEvent(analytics, 'page_view');
    }
  }, [])
  return (
    <Box width="100%" color="white">
      <NavbarHorizontal />

      <Box display="flex" flexDirection="column" m={5}>
        <Box textAlign="center" m={3}>
          <Typography sx={{ fontSize: { xs: 25, sm: 35 } }}>
            Respond. Generate. Craft.
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, sm: 20 } }}>
            Your Creative Hub for Storytelling Mastery
          </Typography>
          <Box m={3}>
            <Typography sx={{ fontSize: { xs: 15, sm: 17 } }}>
              Unlock top-notch ideas with Leonsi to craft captivating storylines
              that grab readers' attention within seconds!{" "}
            </Typography>
            <Button
              variant="contained"
              href="/signup"
              sx={{
                backgroundColor: "#116C93",
                fontSize: { xs: 13 },
                mt: "12px",
                "&:hover": {
                  backgroundColor: "#0E577B", // Optional: darken on hover
                },
              }}
            >
              Get started
            </Button>
          </Box>

          <IconButton
            component="a"
            href="#next-section"
            sx={{ color: "#116C93" }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box
        id="next-section"
        textAlign="center"
        py={5}
        mt={5}
        bgcolor="#0C0D1A"
        color="white"
      >
        <Typography sx={{ fontSize: { xs: 15, sm: 25 } }}>
          Struggling to Find Inspiration? Leonsi Has You Covered.
        </Typography>
        <Typography sx={{ fontSize: { xs: 15, sm: 23 } }} mb={3}>
          Stop Procrastinating & Start Now!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" }, // Column on extra small screens, row on small screens and up
            alignItems: "center",
            px: { xs: 10, sm: 0 }, // Apply padding on small screens to the container
          }}
        >
          <PackageCard
            title="Free Plan"
            price="0"
            description="For our free tier, be able to generate characters and develop your story!"
            sx={{ m: { xs: 2, sm: 1 } }} // Apply margin to each card
          />
          <PackageCard
            title="Premium"
            price="20"
            description="For the premium experience, be able to generate characters and let our chatbot write your story for you!"
            sx={{ m: { xs: 2, sm: 1 } }} // Apply margin to each card
          />
        </Box>
        <Copyright sx={{ mt: 5, color: "white" }} />
      </Box>
    </Box>
  );
}
