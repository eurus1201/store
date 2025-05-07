"use client";
import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const cache = createCache({
  key: "mui",
  prepend: true,
});

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}