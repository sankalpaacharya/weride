import React from "react";

export default function page({ params: { id } }: { params: { id: string } }) {
  return <div>{id}</div>;
}
