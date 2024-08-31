"use client";
import { Box, Typography, Button } from "@mui/material";
import NavbarVertical from "../../../components/NavbarVertical";
import Statistics from "../../../components/Statistics"; // Adjust the import path as needed
import Link from "@mui/material/Link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function Dashboard() {
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

  // Data and options for the Bar chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
    },
  };

  // Data and options for the Line chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Website Traffic",
        data: [30, 45, 60, 70, 55, 65],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
    },
  };

  return (
    <Box bgcolor="#0C0D1A" color="white" minHeight="100vh">
      <NavbarVertical />

      {/* First Section with continuous background */}
      <Box
        textAlign="center"
        py={5}
        px={2}
        bgcolor="inherit" // Ensures the background continues seamlessly
      >
        <Typography variant="h4" mb={4}>
          Analytics
        </Typography>

        {/* Container for the cards */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }} // Column on small screens, row on larger
          justifyContent="center"
          alignItems="center"
          gap={2} // Gap between cards
        >
          <Statistics
            title="Monthly Sales"
            chartType="bar"
            data={barData}
            options={barOptions}
          />
          <Statistics
            title="Website Traffic"
            chartType="line"
            data={lineData}
            options={lineOptions}
          />
        </Box>

        <Button
              variant="contained"
              href="/create-character"
              sx={{
                backgroundColor: "#116C93",
                fontSize: { xs: 13 },
                mt: "12px",
                "&:hover": {
                  backgroundColor: "#0E577B", // Optional: darken on hover
                },
              }}
            >
              Create Character
            </Button>
      </Box>

      <Copyright sx={{ color: "white", mt: 5 }} />
    </Box>
  );
}
