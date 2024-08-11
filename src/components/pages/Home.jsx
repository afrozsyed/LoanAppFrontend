import React from "react";
import { Navbar, Sidebar, Loader} from "../componentLib";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[4rem] flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/6 shadow-md h-screen lg:fixed lg:h-screen lg:overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-full lg:ml-[16.6667%] lg:w-5/6 p-4 lg:p-4 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Home;
