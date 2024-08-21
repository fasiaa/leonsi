import { createTheme } from "@mui/material/styles";
import { Krub } from "next/font/google";

const krub = Krub({
  subsets: ["latin"],
  weight: "400",
});

const theme = createTheme({
  typography: {
    krub: {
      fontFamily: krub.style.fontFamily,
      fontWeight: 400,
      fontSize: "0.85rem",
    },
  },
});

export default theme;
