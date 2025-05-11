import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        User Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        The user you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" component={Link} href="/users" sx={{ mt: 2 }}>
        Back to Users
      </Button>
    </Container>
  );
}