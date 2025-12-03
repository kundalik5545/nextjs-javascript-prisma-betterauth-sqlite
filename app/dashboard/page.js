import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  // Get session server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to signin if not authenticated
  if (!session?.user) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-2xl space-y-8 rounded-lg border bg-white p-8 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Welcome back, {user.name || user.email}!
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Account Information
            </h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-zinc-900 dark:text-white">
                  {user.name || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-zinc-900 dark:text-white">
                  {user.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Email Verified
                </dt>
                <dd className="mt-1 text-sm text-zinc-900 dark:text-white">
                  {user.emailVerified ? (
                    <span className="text-green-600 dark:text-green-400">
                      Verified
                    </span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">
                      Not verified
                    </span>
                  )}
                </dd>
              </div>
              {user.image && (
                <div>
                  <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Profile Image
                  </dt>
                  <dd className="mt-1">
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-16 w-16 rounded-full"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

