import { ReactNode } from "react";
import { Box } from "@mui/material";

interface BlogLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function BlogLayout({ children, modal }: BlogLayoutProps) {
  return (
    <Box sx={{ position: "relative" }}>
      {children}
      {modal}
    </Box>
  );
}