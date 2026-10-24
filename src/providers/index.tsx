"use client";

import { ReactNode } from "react";
import QueryProvider from "./queryProvider";
import AuthProvider from "./authProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};

export default Providers;
