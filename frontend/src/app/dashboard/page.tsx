"use client";

import React from "react";
import NavMenu from "../components/Navmenu";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-zinc-400">
      
      <div className="flex flex-col flex-1">    
        <header className="flex items-center justify-between bg-white shadow-xs">
          <NavMenu />
        </header>

        <main className="flex-1 p-6 overflow-y-auto"></main>
      </div>
    </div>
  );
};

export default Dashboard;
