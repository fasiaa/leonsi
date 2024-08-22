import { createTheme } from "@mui/material/styles";
import { Krona_One, Krub } from "next/font/google";

const krub = Krub({
  subsets: ["latin"],
  weight: "400",
});

const krona_one = Krona_One({
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
    title: {
      fontFamily: krona_one.style.fontFamily,
      fontWeight: 400,
    },
  },
});

export default theme;
