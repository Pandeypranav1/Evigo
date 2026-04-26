import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        paddingLeft: 16,
        paddingRight: 16,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
