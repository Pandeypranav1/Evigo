import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1440,
        margin: "0 auto",
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
