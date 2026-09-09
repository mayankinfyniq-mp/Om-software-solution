"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe layout effect — `useLayoutEffect` in the browser, `useEffect` on
 * the server (avoids React's "useLayoutEffect does nothing on the server").
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
