import { Container, Typography, Box } from "@mui/material";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Posted on {post.date}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
    </Container>
  );
}