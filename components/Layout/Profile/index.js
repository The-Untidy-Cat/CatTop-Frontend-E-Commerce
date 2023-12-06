import Link from "next/link";
import { SidebarMenu } from "../Menu";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useUser } from "@/components/Provider/AuthProvider";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { BrowserView, MobileView } from "react-device-detect";

export const ProfileMenu = ({ activeKey }) => {
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
      icon: <IoCart />,
    },
  ];
  return <SidebarMenu menu={menu} activeKey={activeKey} />;
};

export const ProfileLayout = ({ children, activeKey, backPath = "/user" }) => {
  return (
    <div className="flex flex-col align-center items-start gap-2 w-full h-full">
      <BrowserView className="flex flex-row align-center items-start gap-2 w-full h-full">
        <div className="w-60 shrink-0 px-1">
          <ProfileMenu activeKey={activeKey} />
        </div>
        <div className="w-full p-5 rounded bg-white grow-0">{children}</div>
      </BrowserView>
      <MobileView className="flex flex-col align-center items-start gap-2 w-full h-full">
        <Link href={backPath} className="h-fit w-fit">
          <Button
            type="text"
            className="flex items-center align-center p-0 px-1 font-medium"
            icon={<MdChevronLeft />}
          >
            Quay lại
          </Button>
        </Link>
        <div className="w-full p-5 rounded bg-white grow-0">{children}</div>
      </MobileView>
    </div>
  );
};
