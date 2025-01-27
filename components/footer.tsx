import React from "react";
import { Separator } from "@/components/ui/separator";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type Props = {};

export default function footer({}: Props) {
  return (
    <div className="">
      <Separator />
      <div className="px-20">
        <div className="mt-5 flex justify-center gap-3">
          <FaDiscord size={25} />
          <MdEmail size={25} />
        </div>
      </div>
    </div>
  );
}
