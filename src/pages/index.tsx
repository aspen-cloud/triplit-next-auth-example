import { Inter } from "next/font/google";
import Link from "next/link";
import LoginButton from "@/components/login-button";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <main className={`flex h-screen flex-col p-24  ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center">
        Aperture Science Learning Center
      </h1>
      <div className="flex flex-col items-center justify-center grow-1 h-full ">
        {session ? (
          <>
            <div className=" text-xl">Welcome, {session.user?.name}!</div>
            <Link href="/lesson/1">
              <button className="p-3 bg-purple-500 animate-bounce my-8">
                Start Course
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="text-xl">
              Hello, there! Let&apos;s not waste anymore time. Please, sign in
              to continue to your course.
            </div>
          </>
        )}
        <LoginButton />
      </div>
    </main>
  );
}
