"use client";

import { UserAvatar } from "./components/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <UserAvatar />
        <Card className="w-[500px] border-gray-300 px-4">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Next Js Authentication
            </CardTitle>
            <CardDescription className="text-center">
              Log In or Create account
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4  flex">
            <Button
              className="w-full rounded-full py-6 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
              onClick={() => router.push("/auth/signin")}
            >
              Log in
            </Button>

            <Button
              className="w-full rounded-full border-gray-600 py-6 bg-transparent hover:bg-gray-900 hover:text-white hover:border-transparent transition-colors"
              variant="outline"
              onClick={() => router.push("/auth/signup")}
            >
              Create Account
            </Button>
          </CardContent>
          <CardFooter className="text-sm font-normal"></CardFooter>
        </Card>
      </main>
    </div>
  );
}
