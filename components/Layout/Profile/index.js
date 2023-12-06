import Link from "next/link";
import { SidebarMenu } from "../Menu";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useUser } from "@/components/Provider/AuthProvider";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";

export const ProfileLayout = ({ children, activeKey }) => {
  const { user } = useUser();
  const menu = [
    {
      type: null,
      key: "profie",
      children: (
        <div className="flex flex-col items-center">
          <Image src={logo} className="w-10" alt="logo" />
          <p className="font-semibold text-base my-2">{user?.username}</p>
          <Link href="/user/profile" className="font-medium text-primary">
            <FaRegEdit /> Sửa hồ sơ
          </Link>
        </div>
      ),
    },
    {
      key: "separator1",
      type: "separator",
    },
    {
      key: "my-account",
      name: "Tài khoản",
      type: "section",
      icon: <FaUser />,
      children: [
        {
          key: "my-profile",
          name: "Hồ sơ",
          path: "/user/profile",
          type: "sub-menu",
        },
        {
          key: "my-address",
          name: "Địa chỉ",
          path: "/user/address",
          type: "sub-menu",
        },
        {
          key: "change-password",
          name: "Đổi mật khẩu",
          path: "/user/change-password",
          type: "sub-menu",
        },
      ],
    },
    {
      key: "my-order",
      name: "Đơn hàng",
      type: "link",
      path: "/user/orders",
      icon: <FaUser />,
    },
  ];

  return children ? (
    <div className="flex flex-col md:flex-row align-center items-start gap-2 w-full h-full">
      <div className="hidden md:block md:w-60 shrink-0 px-1">
        <SidebarMenu menu={menu} activeKey={activeKey} />
      </div>
      <Link href="/user" className="md:hidden h-fit w-fit">
        <Button
          type="text"
          className="md:hidden flex items-center align-center p-0 px-1 font-medium"
          icon={<MdChevronLeft />}
        >
          Quay lại
        </Button>
      </Link>
      <div className="w-full p-5 rounded bg-white shrink-0">{children}</div>
    </div>
  ) : (
    <SidebarMenu menu={menu} activeKey={activeKey} />
  );
};
