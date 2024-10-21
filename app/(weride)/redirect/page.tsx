"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  const params = useSearchParams();
  const url = params.get("r");
  useEffect(() => {
    window.location.href = url || "/";
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      redirecting you......
    </div>
  );
}
