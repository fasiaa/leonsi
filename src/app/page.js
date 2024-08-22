"use client";
import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the arrow icon
import NavbarHorizontal from "../../components/NavbarHorizontal";
import PackageCard from "../../components/PackageCard";

export default function Home() {
  return (
    <Box width="100%" color="white">
      <NavbarHorizontal />

      <Box display="flex" flexDirection="column" m={5}>
        <Box textAlign="center" m={3}>
          <Typography fontSize={40}>Respond. Generate. Craft.</Typography>
          <Typography>Your Creative Hub for Storytelling Mastery</Typography>
          <Box m={4}>
            <Typography>
              Unlock top-notch ideas with Leonsi to craft captivating storylines
              that grab readers' attention within seconds!{" "}
            </Typography>
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
        <Typography fontSize={24}>
          Struggling to Find Inspiration? Leonsi Has You Covered.
        </Typography>
        <Typography fontSize={18} mb={3}>
          Stop Procrastinating & Start Now!
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <PackageCard
            title="Free Plan"
            price="0"
            description="For our free tier, be able to generate characters and develop your story!"
          />
          <PackageCard
            title="Premium"
            price="20"
            description="For the premium experience, be able to generate characters and let our chat bot write your story for you!"
          />
        </Box>
      </Box>
    </Box>
  );
}
