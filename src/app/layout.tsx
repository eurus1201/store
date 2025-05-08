import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import EmotionRegistry from "@/lib/registry";
import { Container } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 15 + MUI App",
  description: "A modern STORE app with Next.js 15, TypeScript, and Material-UI",
};
type RootLayoutProps = {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EmotionRegistry> 
          <ThemeRegistry> 
            <Container maxWidth="lg" sx={{padding:"0 16px"}}>
            {children}
            </Container>
            </ThemeRegistry> 
        </EmotionRegistry> 
      </body>
    </html>
  );
}
