"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPAuth({ onChange }) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    onChange(value); // Call the parent's function whenever value changes
  }, [value, onChange]);

  return (
    <InputOTP maxLength={6}
    value={value}
    onChange={(value) => setValue(value)} className="flex space-x-2">
     
      <InputOTPGroup className="flex space-x-2">
      
        <InputOTPSlot
          index={0}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
        <InputOTPSlot
          index={1}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
        <InputOTPSlot
          index={2}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
        <InputOTPSlot
          index={3}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
        <InputOTPSlot
          index={4}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
        <InputOTPSlot
          index={5}
          className="h-12 w-12 text-2xl border border-gray-300 rounded-lg"
        />
      </InputOTPGroup>
    </InputOTP>
  );
}
