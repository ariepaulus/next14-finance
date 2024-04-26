import SideNav from './components/SideNav';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='grid grid-cols-4 gap-8'>
      <aside className='col-span-4 lg:col-span-1'>
        <SideNav />
      </aside>
      <div className='col-span-4 lg:col-span-3'>{children}</div>
    </div>
  );
}
