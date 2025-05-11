import { Container, Typography, Card, CardContent } from "@mui/material";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
}

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  return users.map((user) => ({ id: user.id.toString() }));
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user: User = await res.json();
  if (!user.name) {
    return { title: "User Not Found" };
  }
  return {
    title: user.name,
    description: `Profile details for ${user.name}`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "force-cache", // SSG
  });
  if (!res.ok) {
    notFound();
  }
  const user: User = await res.json();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Company:</strong> {user.company.name}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}