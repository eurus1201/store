"use client";

import { Container, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Users error:", error);
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Something Went Wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        An error occurred while loading the users. Please try again.
      </Typography>
      <Button variant="contained" onClick={reset} sx={{ mt: 2 }}>
        Try Again
      </Button>
    </Container>
  );
}