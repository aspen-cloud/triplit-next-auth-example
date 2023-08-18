import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { TriplitClient } from "@triplit/client";
import { PropsWithChildren, useMemo } from "react";
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

function AuthenticatedTriplitClientProvider({
  children,
}: PropsWithChildren<{}>) {
  const session = useSession();
  const client = useMemo(() => {
    if (typeof window === "undefined" || !session?.data) return null;
    return new TriplitClient<Schema>({
      db: {
        migrations: migrations,
      },
      auth: {
        token: session.data.token,
      },
      sync: {
        apiKey: process.env.NEXT_PUBLIC_TRIPLIT_ANON_TOKEN,
        server: process.env.NEXT_PUBLIC_TRIPLIT_API_URL,
        secure: true,
      },
    });
  }, [session]);

  return (
    <TriplitClientProvider value={client}>{children}</TriplitClientProvider>
  );
}
