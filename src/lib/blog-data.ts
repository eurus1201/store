export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string;
    categoryId: string;
    date: string;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "how-to-learn-nextjs",
      title: "How to Learn Next.js in 2025",
      content: "This is a guide to learning Next.js with practical examples...",
      categoryId: "tech",
      date: "2025-05-01",
    },
    {
      id: "2",
      slug: "react-hooks-guide",
      title: "Mastering React Hooks",
      content: "A deep dive into useState, useEffect, and more...",
      categoryId: "react",
      date: "2025-04-15",
    },
  ];
  
  export const categories: Category[] = [
    { id: "tech", name: "Technology" },
    { id: "react", name: "React" },
  ];
  
  export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = blogPosts.find((p) => p.slug === slug);
    return post || null;
  }
  
  export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
    return blogPosts.filter((p) => p.categoryId === categoryId);
  }
  
  export async function getAllPosts(): Promise<BlogPost[]> {
    return blogPosts;
  }
  
  export async function getCategoryById(id: string): Promise<Category | null> {
    const category = categories.find((c) => c.id === id);
    return category || null;
  }