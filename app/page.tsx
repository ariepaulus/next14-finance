import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link href='/auth/login'>Login</Link>
      </div>
      <div>
        <Link href='/dashboard'>Dashboard</Link>
      </div>
    </main>
  );
}
