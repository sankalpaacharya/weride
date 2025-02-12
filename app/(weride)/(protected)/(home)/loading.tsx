import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FilterBar from "@/components/filterbar";

const PageSkeleton = () => {
  return (
    <div className="w-full">
      {/* Secondary Nav */}
      <FilterBar />
      {/* <div className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Skeleton className="h-6 w-6" />
          <div className="flex gap-4 items-center">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      {/* <div className="bg-purple-800 py-16 px-4">
        <div className="container mx-auto text-center">
          <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-full flex items-center gap-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Frequently Booked Section */}
      <div className="container mx-auto px-4 mt-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              {/* Image placeholder */}
              <Skeleton className="w-full h-48" />

              {/* Card content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>

                <Skeleton className="h-4 w-24 mb-4" />

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
