"use client";
import { X, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const CancelRideButton = ({ isActive }: { isActive: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={isActive || pending}
      className={`flex items-center gap-2 w-full justify-center`}
    >
      {pending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <X size={20} />
      )}
      End Ride
    </button>
  );
};

export default CancelRideButton;
