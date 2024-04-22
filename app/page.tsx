import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link href='/dashboard'>Dashboard</Link>
      </div>
      <div>
        <Link href='/playground'>Playground</Link>
      </div>
    </main>
  );
}
