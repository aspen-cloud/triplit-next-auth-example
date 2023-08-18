/**
 * This file exports a context provider and a hook that can be used to access the Triplit API client.
 */

import { createContext, useContext } from "react";

import { TriplitClient } from "@triplit/client";

const TriplitClientContext = createContext<TriplitClient | null>(null);

export const TriplitClientProvider = TriplitClientContext.Provider;

export function useClient(): TriplitClient | null {
  const client = useContext(TriplitClientContext);
  return client;
}
