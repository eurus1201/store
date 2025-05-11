import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import PeopleIcon from '@mui/icons-material/People';

// Revalidate every 1 hour (ISR)
export const revalidate = 3600;

interface User {
    id: number;
    name: string;
    email: string;
}

export default async function UsersPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        next: { revalidate: 3600 }, // ISR
    });
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }
    const users: User[] = await res.json();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                <PeopleIcon sx={{ fontSize: 24, verticalAlign: "middle", ml: 1 }} /> Users List
            </Typography>
            <List sx={{ paddingBottom: 9 }}>
                {users.map((user) => (
                    <ListItem component={Link} href={`/users/${user.id}`} key={user.id} 
                    sx={{ textDecoration: "none", border: "1px solid", borderColor: "divider", borderRadius: "4px", mb: 1 }}>
                        <ListItemText
                            primary={user.name}
                            secondary={user.email}
                            sx={{ color: "text.primary" }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}