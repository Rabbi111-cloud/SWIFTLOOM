"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const fromSignup = params.get("fromSignup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 🔥 check onboarding status
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.data();

      if (!data?.onboardingCompleted) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {fromSignup && (
        <p style={{ color: "green" }}>
          Account created successfully. Please log in.
        </p>
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
