"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase/auth";
import { db } from "../../firebase/firestore";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinishOnboarding = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        router.push("/login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        onboardingCompleted: true,
        onboardingCompletedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome 👋</h1>
      <p>Let’s finish setting up your account.</p>

      <button onClick={handleFinishOnboarding} disabled={loading}>
        {loading ? "Finishing..." : "Finish Setup"}
      </button>
    </div>
  );
}
