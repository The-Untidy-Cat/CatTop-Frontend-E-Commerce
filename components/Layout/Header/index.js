import Image from "next/image";
import logo from "@/public/logo.png";
import { Dropdown, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { IoCallSharp, IoCartSharp } from "react-icons/io5";
import { FaHeadphonesAlt, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import React from "react";
import { OFFLINE_STORES } from "@/app.config";
import { useAuth } from "@/components/Provider/AuthProvider";
const { Search } = Input;

const address = OFFLINE_STORES.map((item) => {
  return {
    key: item.id,
    label: (
      <div className="flex flex-col w-56 gap-1 py-1">
        <p className="font-bold text-xs uppercase">{item.name}</p>
        <ol className="ml-5 list-disc text-xs font-medium">
          <li>{item.address}</li>
        </ol>
      </div>
    ),
  };
});

export default function Header({ showSearch = true }) {
  const onSearch = () => console.log("Đã tìm");
  return (
    <header className="flex justify-center px-5 border-b bg-white shrink-0 ">
      <div className="flex flex-col lg:max-w-4xl w-full">
        <div className="flex flex-nowrap w-full items-center align-center justify-between py-4 gap-2">
          <div className="flex items-center align-center gap-3 w-fit shrink-0">
            <Link href="/">
              <Image src={logo} alt="logo" className="logo w-10" />
            </Link>
            {showSearch ? (
              <Input
                size="small"
                prefix={
                  <AiOutlineSearch className="font-bold text-primary text-base m-0 p-0" />
                }
                className="flex px-2.5 py-1 bg-secondary/[.2] border-primary border-0 focus:border rounded-full items-center align-center w-10 sm:w-36 md:w-64 lg:w-72 text-xs font-medium search"
                allowClear
                autoComplete="off"
              />
            ) : (
              <Link
                href="/"
                className="text-[#58585B] font-bold text-lg md:text-xl hover:text-primary transition-all duration-200"
              >
                CatTop
              </Link>
            )}
          </div>
          <div className="flex justify-end lg:justify-between items-center gap-2 w-full">
            <div className="flex items-center align-center gap-1 w-fit shrink-0">
              <Link
                href="tel:1900633579"
                className="hover:bg-secondary/[.2] rounded-md text-xs px-3 py-2.5 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
              >
                <IoCallSharp className="text-lg text-primary" />
                <span className="hidden lg:block">1500.10.0912</span>
              </Link>
              <Dropdown
                menu={{
                  items: address,
                }}
                placement="bottom"
                trigger={["click", "hover"]}
              >
                <span className="hover:bg-secondary/[.2] rounded-md text-xs px-3 py-2.5 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit cursor-pointer">
                  <FaMapMarkerAlt className="text-lg text-primary" />
                  <span className="hidden lg:block">Địa chỉ cửa hàng</span>
                </span>
              </Dropdown>
              <Link
                href="#claim"
                className="hover:bg-secondary/[.2] rounded-md text-xs px-3 py-2.5 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
              >
                <FaHeadphonesAlt className="text-lg text-primary" />
                <span className="hidden lg:block">Khiếu nại</span>
              </Link>
            </div>
            <div className="flex items-center align-center gap-2 w-fit shrink-0">
              <Link
                href="#cart"
                className="hover:text-primary rounded-full bg-secondary/[.3] p-2 font-semibold flex justify-center items-center align-center text-gray-600 gap-2 w-fit shrink-0"
              >
                <IoCartSharp className="text-lg" />
              </Link>
              {/* <span className="border-r border-gray-300 h-5"></span>
            {user ? (
              <Dropdown
                menu={{
                  items: address,
                }}
                placement="bottom"
                trigger={["click"]}
              >
                <FaUserCircle className="text-[28px] text-gray-200 ring ring-secondary/[.5] rounded-full" />
              </Dropdown>
            ) : (
              <Link href={"/login"} className="flex items-center align-center h-fit w-fit m-0 p-0">
                <AiOutlineLogin className="text-[28px] text-gray-200 ring ring-secondary/[.5] rounded-full" />
              </Link>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
