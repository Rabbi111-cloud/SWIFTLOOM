import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>AI Assessment Platform</h1>
      <p>Evaluate backend engineers with AI.</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/signup">
          <button style={{ marginRight: 10 }}>Create Account</button>
        </Link>

        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
