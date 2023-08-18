import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginButton({ className }: { className?: string }) {
  const { data: session } = useSession();
  return (
    <div>
      <button
        className={`p-2 bg-gray-500 rounded-sm ${className}`}
        onClick={() => (session ? signOut() : signIn())}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
