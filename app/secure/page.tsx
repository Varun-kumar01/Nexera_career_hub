"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid credentials"
        );
        return;
      }

      router.push("/secure/dashboard");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#635BFF] text-xl font-black text-white">
            N
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
            Nexera Admin
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Sign in to manage your website.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@nexeracareerhub.com"
              className="w-full rounded-xl border border-[#e4e7ec] px-4 py-3 text-sm outline-none transition focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10"
              required
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#e4e7ec] px-4 py-3 text-sm outline-none transition focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10"
              required
            />
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#635BFF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole size={16} />

            {loading ? "Signing in..." : "Sign in"}

            {!loading && (
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}