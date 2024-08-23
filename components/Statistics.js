"use client";
import { Box, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
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

const Statistics = ({ title, chartType, data, options }) => {
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // X-axis grid line color
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Y-axis grid line color
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // X-axis grid line color
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Y-axis grid line color
        },
      },
    },
  };

  // Choose the correct options based on the chart type
  const chartOptions = chartType === "bar" ? barOptions : lineOptions;

  return (
    <Box
      width={{ xs: "90%", sm: "45%", md: "30%" }}
      height="auto"
      p={2}
      borderRadius={5}
      bgcolor="rgba(24, 25, 50, .6)"
      sx={{
        boxShadow: "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)",
        border: "1px solid #1C6090",
      }}
    >
      <Typography variant="h6" mb={2} textAlign="center" color="white">
        {title}
      </Typography>
      {/* Render the appropriate chart based on chartType */}
      {chartType === "bar" && <Bar data={data} options={chartOptions} />}
      {chartType === "line" && <Line data={data} options={chartOptions} />}
    </Box>
  );
};

export default Statistics;
