"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTPAuth } from "@/app/components/InpuOTP";
import useAuthStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/Loader";

const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const router = useRouter();
  const { error, isLoading, verifyLoginOtp, email } = useAuthStore();

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    if (name.length <= 3) return email;
    const maskedName = `${name.slice(0, 3)}***${name[name.length - 1]}`;
    return `${maskedName}@${domain}`;
  };

  const handleChange = (otpValue) => {
    setOtp(otpValue);
    setIsOtpValid(otpValue.length === 6); // Check OTP length for button enable
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyLoginOtp(otp); // Pass OTP directly to verifyLoginOtp
      router.push("/dashboard");
    } catch (error) {
      console.log("Error verifying OTP:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex justify-center items-center bg-white shadow-lg rounded-2xl w-[600px] h-[400px]">
            <button
              className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-gray-700"
              onClick={() => router.back()}
            >
              &times;
            </button>
            <div className="flex-col p-6 justify-center items-center space-y-4 w-96 text-center">
              <h2 className="text-2xl font-semibold">Enter the OTP to login</h2>
              <div>
                <p className="text-xs font-normal leading-1 text-gray-500">
                  We emailed a six-digit code to {maskEmail(email)}
                </p>
                <p className="text-xs font-normal leading-1 text-gray-500">
                  Please confirm your account to continue
                </p>
              </div>

              <InputOTPAuth onChange={handleChange} />
              {error && <p className="text-red-500 font-semibold">{error}</p>}

              <div>
                <p className="text-xs font-normal leading-1 text-gray-500">
                  Didn’t receive a code?{" "}
                  <b className="cursor-pointer">Resend Code</b>
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  className="w-full rounded-full py-6"
                  onClick={handleSubmit}
                  disabled={!isOtpValid || isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginOtp;
