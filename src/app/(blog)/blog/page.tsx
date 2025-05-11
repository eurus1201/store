import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { getAllPosts, getCategoryById } from "@/lib/blog-data";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog
      </Typography>
      <List>
        {await Promise.all(
          posts.map(async (post) => {
            const category = await getCategoryById(post.categoryId);
            return (
              <ListItem key={post.id}>
                <ListItemText
                  primary={
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                      {post.title}
                    </Link>
                  }
                  secondary={`Posted on ${post.date} in ${category?.name || "Unknown"}`}
                />
              </ListItem>
            );
          })
        )}
      </List>
    </Container>
  );
}