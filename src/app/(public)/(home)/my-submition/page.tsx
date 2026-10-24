"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function MySubmitionRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/my-submition");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Redirecting to My Submissions...</span>
      </div>
    </div>
  );
}
