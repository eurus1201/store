import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Blog Post Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        The blog post you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" component={Link} href="/blog" sx={{ mt: 2 }}>
        Back to Blog
      </Button>
    </Container>
  );
}