import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div style={{ width: "90%", maxWidth: 1600, margin: "0 auto", padding: "0 20px" }}>{children}</div>;
}

