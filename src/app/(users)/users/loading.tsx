import { Container, CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </Container>
  );
}