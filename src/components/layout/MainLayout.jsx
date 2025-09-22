import React, { useContext, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CommonSidebar from './CommonSidebar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const MainLayout = () => {
  const {user}=useContext(AuthContext)
  const role = user.role;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <CommonSidebar 
          userType={role} 
          isOpen={sidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Content area */}
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          } md:ml-64`}
        >
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem-64px)]">
              <Outlet />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
