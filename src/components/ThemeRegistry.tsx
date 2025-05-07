"use client";

import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme,Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode, Switch } from "@mui/material";
import Navbar from "./Navbar";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as PaletteMode) ?? "light";
    setMode(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("theme", mode);
  }, [mode, mounted]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        },

        palette: {
          mode,
          ...(mode === "light"
            ? {
               
              background: { default: "#f5f5f5", paper: "#ffffff" },
              primary: { main: "#033363" },
              secondary: { main: "#b53662" },
              text: {
                primary: "#000000",
                secondary: "#757575",
                disabled: "#9e9e9e",
              }
            }
            : {
              text: {
                primary: "#ffffff",
                secondary: "#bdbdbd",
                disabled: "#757575",
              },
              background: { default: "#121212", paper: "#1d1d1d" },
              primary: { main: "#90caf9" },
              secondary: { main: "#f48fb1" },
            }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam: Theme) => ({
              a: {
                color: themeParam.palette.primary.main, // #033363 (light), #90caf9 (dark)
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  color: themeParam.palette.primary.dark, // Darker shade on hover
                },
                "&:visited": {
                  color:
                    themeParam.palette.mode === "light"
                      ? themeParam.palette.secondary.main // #b53662 (light)
                      : themeParam.palette.secondary.light, // Lighter secondary for dark
                },
                "&:focus": {
                  outline: `2px solid ${themeParam.palette.primary.main}`,
                  outlineOffset: "2px",
                },
              },
            }),
          },
        }
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      {children}
    </ThemeProvider>
  );
}
