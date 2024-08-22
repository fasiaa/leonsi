"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";
import theme from "../../styles/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <html lang="en">
            <body>{children}</body>
          </html>
        </CssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
