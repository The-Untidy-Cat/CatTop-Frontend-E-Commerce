import React, { useState } from "react";
import Categories from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import { useAuth } from "../Provider/AuthProvider";
import Head from "next/head";

const AccountBar = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center px-5 bg-transparent shrink-0">
      <div className="flex w-full lg:max-w-4xl justify-between py-1.5 gap-3">
        <div className="flex items-center align-center gap-1 w-full">
          {/* <Link
              href="/register"
              className="text-gray-600 text-xs font-medium"
            >
              Tra cứu đơn hàng
            </Link> */}
        </div>
        <div className="flex items-center align-center gap-1 w-fit shrink-0 gap-4">
          {!user ? (
            <>
              <Link
                href="/register"
                className="text-gray-600 text-xs font-medium"
              >
                Đăng ký
              </Link>
              <Link href="/login" className="text-gray-600 text-xs font-medium">
                Đăng nhập
              </Link>
            </>
          ) : (
            user?.name
          )}
        </div>
      </div>
    </div>
  );
};

const DefaultLayout = ({
  children,
  showCategories = true,
  title = "CatTop - Chuyên Laptop",
  showFooter = true,
  showSearch = true,
  showAccountBar = true,
  fullWidth = false,
}) => {
  return (
    <main className="flex flex-col justify-between h-full min-h-screen w-full m-0 p-0">
      <Head>
        <title>{title}</title>
      </Head>
      {showAccountBar && <AccountBar />}
      <div className="sticky top-0">
        <Header showSearch={showSearch} />
        {showCategories == true && <Categories />}
      </div>
      {!fullWidth ? (
        <div className="m-auto w-full px-5 py-5 md:py-10 lg:max-w-4xl h-fit shrink-0 grow-0">
          {children}
        </div>
      ) : (
        <div className="m-auto w-full h-full shrink-0 grow-0">{children}</div>
      )}
      {showFooter && <Footer />}
    </main>
  );
};

const FullWidthLayout = ({
  children,
  showCategories = true,
  title = "CatTop - Chuyên Laptop",
  showFooter = true,
  showSearch = true,
  showAccountBar = true,
}) => {
  return (
    <main className="flex flex-col justify-between h-full min-h-screen w-full m-0 p-0">
      <Head>
        <title>{title}</title>
      </Head>
      {showAccountBar && <AccountBar />}
      <Header showSearch={showSearch} />
      {showCategories == true && <Categories />}
      <div className="m-auto w-full h-full">{children}</div>
      {showFooter && <Footer />}
    </main>
  );
};

export { DefaultLayout, FullWidthLayout };
