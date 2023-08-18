import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { MemoryStorage, TriplitClient } from "@triplit/client";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { migrations, Schema } from "../../triplit/schema";
import { TriplitClientProvider } from "@/hooks/use-triplit-client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthenticatedTriplitClientProvider>
        <Component {...pageProps} />
      </AuthenticatedTriplitClientProvider>
    </SessionProvider>
  );
}

const client = new TriplitClient<Schema>({
  db: {
    migrations: migrations,
    storage: { cache: new MemoryStorage(), outbox: new MemoryStorage() },
  },
  sync: {
    apiKey: process.env.NEXT_PUBLIC_TRIPLIT_ANON_TOKEN,
    server: process.env.NEXT_PUBLIC_TRIPLIT_API_URL,
    secure: true,
  },
});

function AuthenticatedTriplitClientProvider({
  children,
}: PropsWithChildren<{}>) {
  const session = useSession();
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      session?.data?.token === client.syncEngine.token
    )
      return;
    client?.updateAuthOptions({ token: session?.data?.token });
  }, [session?.data?.token]);

  return (
    <TriplitClientProvider value={client}>{children}</TriplitClientProvider>
  );
}
