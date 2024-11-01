"use client";

import { useState } from "react";
import { UserAvatar } from "@/app/components/Avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/Loader";
import useAuthStore from "@/app/store/authStore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { login, error, isLoading, setEmail: setGlobalEmail } = useAuthStore();
  const router = useRouter();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(emailValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        console.log("Sending OTP to:", email);
        setGlobalEmail(email);
        await login(email);
        router.push("/auth/login-otp");
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <UserAvatar />
        <Card className="w-[500px] border-gray-300 px-4">
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign in</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="email" className="font-light">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="border-gray-300 rounded-lg py-5"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {error && <p className="text-red-500 font-semibold">{error}</p>}
                <Button
                  type="submit"
                  className="w-full rounded-full py-6"
                  disabled={!isEmailValid}
                >
                  {isLoading ? <LoadingSpinner /> : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-sm font-normal">
            <p>
              By continuing you agree to the
              <a className="underline underline-offset-4 cursor-pointer">
                {" "}
                Terms of Use
              </a>{" "}
              and
              <a className="underline underline-offset-4 cursor-pointer">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
        <div className="flex items-center justify-center w-full my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <Button
          className="w-full rounded-full border-gray-600 py-6"
          variant="outline"
          onClick={() => router.push("/auth/signup")}
        >
          Create Account
        </Button>
      </main>
    </div>
  );
}
