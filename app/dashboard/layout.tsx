import PageHeader from '@/components/PageHeader';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='space-y-8 mb-44 ml-44 mr-44'>
      <h1 className='text-4xl mt-8'>Dashboard</h1>
      <div>
        <h2 className='mb-4 text-lg font-mono'>PageHeader</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div>
          <PageHeader className='' />
        </div>
      </div>
      <main>{children}</main>
      <footer className='mt-auto text-center py-8 px-4 sm:px-6 lg:px-8'>
        Footer
      </footer>
    </main>
  );
}
