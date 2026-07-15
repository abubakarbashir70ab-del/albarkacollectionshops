import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import Cursor from './Cursor';
import Background from './Background';
import WhatsAppWidget from './WhatsAppWidget';

export function Layout() {
  return (
    <>
      <Cursor />
      <Background />
      <Header />
      <main className="w-full pt-[148px] min-h-screen relative z-10">
        <div className="flex flex-col w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
