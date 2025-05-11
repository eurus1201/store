import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";

interface ModalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          maxWidth: 600,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Posted on {post.date}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {post.content.slice(0, 200)}...
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.history.back()}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}