import { Outlet } from 'react-router-dom';  // Outlet will render child routes
import NavBar from '../components/navbar';
import Footer from '../components/footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar /> 
      <main className="flex-1 p-6"> 
        <Outlet /> 
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;
