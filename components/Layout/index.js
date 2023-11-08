import React, { useState } from "react";
import Categories from "./Menu";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main className="flex flex-col justify-between h-full min-h-screen w-full m-0 p-0">
      <Header />
      <Categories />
      <div className="m-auto w-full px-5 py-5 md:py-10 lg:max-w-4xl h-full">
        {
          children
        }
      </div>
      <Footer />
    </main>
  );
};
export default DefaultLayout;
