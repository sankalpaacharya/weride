"use client";
import UpdatePasswordForm from "@/components/updatepassword-form";
import React, { ReactEventHandler, useState } from "react";

export default function UpdatePassword() {
  return (
    <div className="w-full flex mt-20 items-center justify-center">
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}
