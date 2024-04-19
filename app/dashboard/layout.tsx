import PageHeader from '@/components/PageHeader';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PageHeader className='my-8' />
      {children}
      <footer>Footer</footer>
    </>
  );
}
