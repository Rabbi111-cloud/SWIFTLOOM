"use client"; // Must be the very first line

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
        alert("You must be logged in.");
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
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome 👋</h1>
      <p>Let’s finish setting up your account.</p>

      <button
        onClick={handleFinishOnboarding}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Finishing..." : "Finish Setup"}
      </button>
    </div>
  );
}
