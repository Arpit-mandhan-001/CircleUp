import { Header } from '../component/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <>
    <Header />
    <main className="px-60 py-6">
      <Outlet /> 
    </main>
  </>
);
