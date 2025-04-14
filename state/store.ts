import { Provider } from "jotai";
import React from "react";

// Create a custom provider component
export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(Provider, null, children);
}

// Re-export commonly used Jotai utilities
export { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
export { atomWithStorage } from "jotai/utils";
