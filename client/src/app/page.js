"use client";
import { Box, Typography } from "@mui/material";
import NavbarHorizontal from "../../components/NavbarHorizontal";
import PackageCard from "../../components/PackageCard";

export default function Home() {
  return (
    <Box width="100%" color="white">
      <NavbarHorizontal></NavbarHorizontal>
      <Box display="flex" flexDirection="column" m={5}>
        <Box textAlign="center" m={3}>
          <Typography fontSize={40}>Respond. Generate. Craft.</Typography>
          <Typography>Your Creative Hub for Storytelling Mastery</Typography>
          <Typography>
            Unlock top-notch ideas with Leonsi to craft captivating storylines
            that grab readers' attention within seconds!{" "}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography>
            Struggling to Find Inspiration? Leonsi Has You Covered.
          </Typography>
          <Typography>Stop Procrastinating & Start Now!</Typography>
        </Box>
        <Box m={3} display="flex" justifyContent="center" gap={2}>
          <PackageCard
            title="Free Plan"
            price="0"
            description="For our free tier, be able to generate characters and develop your story!"
          ></PackageCard>
          <PackageCard
            title="Premium"
            price="20"
            description="For the premium experience, be able to generate characters and let our chat bot write your story for you!"
          ></PackageCard>
        </Box>
      </Box>
    </Box>
  );
}
