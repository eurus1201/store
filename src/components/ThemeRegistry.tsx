"use client";

import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
              }
            : {
                background: { default: "#121212", paper: "#1d1d1d" },
                primary: { main: "#90caf9" },
                secondary: { main: "#f48fb1" },
              }),
        },
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
