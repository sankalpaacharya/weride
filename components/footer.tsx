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
          <a
            href="https://discord.gg/bEMrcuW3W3"
            target="_blank"
            rel="noopener noreferrer"
            title="Join our Discord">
            <FaDiscord size={25} />
          </a>
          <a
            href="mailto:team@weride.live"
            title="Mail us your Query">
            <MdEmail size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}
