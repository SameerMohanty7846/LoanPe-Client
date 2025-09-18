import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CommonSidebar from './CommonSidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const role = localStorage.getItem("role") || "user";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />
      
      {/* Main content area with sidebar and outlet */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <CommonSidebar userType={role} />
        
        {/* Content area with main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Main content area that grows to push footer down */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem-64px)]">
              <Outlet />
            </div>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;