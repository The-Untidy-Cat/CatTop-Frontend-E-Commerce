import React, { useState } from "react";
import Categories from "./Menu";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main className="flex flex-col bg-gray-100/[.2] h-full w-full over-hidden m-0 p-0">
      <Header />
      <Categories />
    </main>
  );
};
export default DefaultLayout;
