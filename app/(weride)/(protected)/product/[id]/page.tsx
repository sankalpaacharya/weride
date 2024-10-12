import React from "react";

type paramsProps = {
  params: { id: string };
};

export default function Page({ params }: paramsProps) {
  const { id: bikeId } = params;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-7xl w-full bg-gray-100 p-6 ">asd</div>
    </div>
  );
}
