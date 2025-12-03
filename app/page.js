import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // Check if user is authenticated
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    // If session check fails, treat as not authenticated
    console.error("Session check error:", error);
  }

  // Redirect to dashboard if logged in
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Welcome
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Get started by signing in or creating an account
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
