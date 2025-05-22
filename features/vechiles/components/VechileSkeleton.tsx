import { Skeleton } from "@/components/ui/skeleton";

const VechileSkeleton = () => {
  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full aspect-video rounded-lg" />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <Skeleton className="h-[400px] rounded-lg" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-24 w-3/5" />
        </div>

        {/* Owner Info Skeleton */}
        <div className="md:mt-20 mt-10 flex gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-40" />
            <div className="mt-4 flex gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-24 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VechileSkeleton;
