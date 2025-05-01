import React from "react";

interface HeadProps {
  title: string;
  description: string;
}

export default function Head({ title, description }: HeadProps) {
  return (
    <>
      {/* This is just for client-side rendering, Next.js would use real Head component */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://trinethra-defentech.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
