"use client";

import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode, Switch } from "@mui/material";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  /** ---------- 1.  State that survives hydration ---------- */
  //   We start with “light” on the server and read the stored value
  //   only when we’re sure we’re in the browser.
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // runs only in the browser
    const stored = (localStorage.getItem("theme") as PaletteMode) ?? "light";
    setMode(stored);
    setMounted(true);
  }, []);

  /** ---------- 2.  Persist user choice ---------- */
  useEffect(() => {
    if (mounted) localStorage.setItem("theme", mode);
  }, [mode, mounted]);

  /** ---------- 3.  Build the theme ---------- */
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
                primary: { main: "#1976d2" },
                secondary: { main: "#dc004e" },
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

  /** ---------- 4.  Toggle handler ---------- */
  const handleToggle = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setMode(checked ? "dark" : "light");

  /** ---------- 5.  Avoid a flash of un-styled content ---------- */
  if (!mounted) return null;

  /** ---------- 6.  Render ---------- */
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <Switch
        checked={mode === "dark"}
        onChange={handleToggle}
        aria-label="Toggle dark mode"
        sx={{ position: "fixed", top: 16, right: 16 }}
      />
    </ThemeProvider>
  );
}
