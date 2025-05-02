"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { defaultTheme } from "./themes";

// Use modern as the default theme instead of empty string
const configAtom = atomWithStorage<string>("theme", defaultTheme.key);

export function useTheme() {
  return useAtom(configAtom);
}
