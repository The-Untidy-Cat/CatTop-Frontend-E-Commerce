import Image from "next/image";
import logo from "@/public/logo.png";
import { Button, Dropdown, Input, Space } from "antd";
import { AiOutlineSearch, AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";
import { IoCallSharp, IoCartSharp } from "react-icons/io5";
import { FaHeadphonesAlt, FaMapMarkerAlt } from "react-icons/fa";
import React from "react";
import { OFFLINE_STORES } from "@/app.config";
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
  }
})

export default function Header() {
  const onSearch = () => console.log("Đã tìm");
  return (
    <header className="flex justify-center px-5 border-b bg-white shrink-0">
      <div className="flex flex-nowrap lg:max-w-4xl w-full items-center align-center justify-between py-4 gap-2">
        <div className="flex gap-3 w-fit shrink-0">
          <Image src={logo} alt="logo" className="logo w-10" />
          <Input
            size="small"
            prefix={
              <AiOutlineSearch className="font-bold text-primary text-base m-0 p-0" />
            }
            className="flex px-2.5 py-1 bg-secondary/[.2] border-primary border-0 focus:border rounded-full items-center align-center w-48 md:w-64 lg:w-72 text-xs font-medium search"
            allowClear
          />
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
              trigger={["click", 'hover']}
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
          <Link
            href="#cart"
            className="hover:text-primary rounded-full bg-secondary/[.2] p-2 font-semibold flex justify-center items-center align-center text-gray-600 gap-2 w-fit shrink-0"
          >
            <IoCartSharp className="text-lg" />
          </Link>
        </div>
      </div>
    </header>
  );
}
