import Image from "next/image";
import logo from "@/public/logo.png";
import { Button, Dropdown, Input, Space } from "antd";
import { AiOutlineSearch, AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";
import { IoCallSharp, IoCartSharp } from "react-icons/io5";
import { FaHeadphonesAlt, FaMapMarkerAlt } from "react-icons/fa";
import React from "react";
const { Search } = Input;

const address = [
  {
    key: 1,
    label: (
      <div className="flex flex-col w-56">
        <p className="">Miền Nam</p>
        <ol className="ml-5 list-disc">
          <li>KP6, P.Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh</li>
        </ol>
      </div>
    ),
  },
];
export default function Header() {
  const onSearch = () => console.log("Đã tìm");
  return (
    <header>
      <div className="flex justify-center px-5 border-b">
        <div className="flex flex-nowrap lg:max-w-4xl w-full items-center align-center justify-between py-5 gap-2">
          <div className="flex gap-3 w-fit shrink-0">
            <Image src={logo} alt="logo" className="logo w-10" />
            <Input
              size="small"
              addonBefore={
                <AiOutlineSearch className="font-bold text-gray-600 m-0 p-0" />
              }
              bordered={false}
              className="flex px-2 py-1 bg-secondary/[.2] focus:ring-2 focus:ring-primary rounded-full text-sm items-center align-center w-48 md:w-64 text-sm"
              allowClear
            />
          </div>
          <div className="flex justify-end lg:justify-between items-center gap-2 w-full">
            <div className="flex items-center align-center gap-1 w-fit shrink-0">
              <Link
                href="tel:1900633579"
                className="hover:bg-secondary/[.2] rounded-md text-sm p-3 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
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
                <span className="hover:bg-secondary/[.2] rounded-md text-sm p-3 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit">
                  <FaMapMarkerAlt className="text-lg text-primary" />
                  <span className="hidden lg:block">Địa chỉ cửa hàng</span>
                </span>
              </Dropdown>
              <Link
                href="https://onwardtogether.one/listen"
                className="hover:bg-secondary/[.2] rounded-md text-sm p-3 font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
              >
                <FaHeadphonesAlt className="text-lg text-primary" />
                <span className="hidden lg:block">Khiếu nại</span>
              </Link>
            </div>
            <Link
              href="https://onwardtogether.one/listen"
              className="hover:text-primary rounded-md text-sm-full bg-secondary/[.2] p-2 font-semibold flex justify-center items-center align-center text-gray-600 gap-2 w-fit shrink-0"
            >
              <IoCartSharp className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
