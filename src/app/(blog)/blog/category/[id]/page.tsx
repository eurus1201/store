import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory, getCategoryById } from "@/lib/blog-data";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) {
    notFound();
  }
  const posts = await getPostsByCategory(id);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Category: {category.name}
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText
              primary={
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  {post.title}
                </Link>
              }
              secondary={`Posted on ${post.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}