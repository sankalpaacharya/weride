import React from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: PageProps) {
  const { id } = await params;
  return <div>hello</div>;
}
