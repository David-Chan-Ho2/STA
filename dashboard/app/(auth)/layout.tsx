import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export default layout;
