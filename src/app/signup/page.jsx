"use client";

import { useState } from "react";
import { signupUser } from "@/lib/signupHandler";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignup = async () => {
    try {
      await signupUser({ email, password, fullName });
      router.push("/onboarding");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <input placeholder="Full name" onChange={e => setFullName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
