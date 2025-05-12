import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        The authentication page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" component={Link} href="/login" sx={{ mt: 2 }}>
        Go to Login
      </Button>
    </Container>
  );
}