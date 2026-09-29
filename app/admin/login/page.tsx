"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
    });
    if (!error) setSent(true);
  }

  if (sent) {
    return (
      <main className="max-w-sm mx-auto p-6 text-center">
        <p>Check your email for a login link.</p>
      </main>
    );
  }

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Owner Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button className="bg-black text-white rounded px-3 py-2">
          Send login link
        </button>
      </form>
    </main>
  );
}
