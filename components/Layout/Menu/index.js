import { Dropdown, Image, Pagination } from "antd";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { GiLaptop } from "react-icons/gi";
import { getAllBrand } from "@/services/brand";
import { useEffect, useState } from "react";
import { Collapse } from "antd";
import Link from "next/link";
import { AiOutlineHome, AiFillShopping } from "react-icons/ai";
import {
  MdOutlinePeopleAlt,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FiUser } from "react-icons/fi";

const SIDEBAR_MENU = [
  {
    key: "home",
    name: "Home",
    path: "/",
    type: "link",
    icon: <AiOutlineHome />,
  },
  {
    key: "separator-1",
    type: "separator",
  },
  {
    key: "Đơn hàng",
    name: "Đơn hàng",
    type: "section",
    icon: <BiShoppingBag />,
    children: [
      {
        key: "Danh sách đơn hàng",
        name: "Danh sách đơn hàng",
        path: "/orders",
        type: "sub-menu",
      },
      {
        key: "Thống kê đơn hàng",
        name: "Thống kê đơn hàng",
        path: "/",
        type: "sub-menu",
      },
      {
        key: "Danh sách bảo hành",
        name: "Danh sách bảo hành",
        path: "/",
        type: "sub-menu",
      },
      {
        key: "Danh sách đổi trả",
        name: "Danh sách đổi trả",
        path: "/",
        type: "sub-menu",
      },
    ],
  },
  {
    key: "Khách hàng",
    name: "Khách hàng",
    type: "section",
    icon: <MdOutlinePeopleAlt />,
    children: [
      {
        key: "Danh sách khách hàng",
        name: "Danh sách khách hàng",
        path: "/customers",
        type: "sub-menu",
      },
    ],
  },
  {
    key: "Sản phẩm",
    name: "Sản phẩm",
    type: "section",
    icon: <MdOutlineProductionQuantityLimits />,
    children: [
      {
        key: "Danh sách sản phẩm",
        name: "Danh sách sản phẩm",
        path: "/products",
        type: "sub-menu",
      },
      {
        key: "Danh sách thương hiệu",
        name: "Danh sách thương hiệu",
        path: "/products/brands",
        type: "sub-menu",
      },
    ],
  },
  {
    key: "Nhân viên",
    name: "Nhân viên",
    type: "section",
    icon: <FiUser />,
    children: [
      {
        key: "Danh sách nhân viên",
        name: "Danh sách nhân viên",
        path: "/employees",
        type: "sub-menu",
      },
    ],
  },
];

const MenuItem = ({ item, activeKey }) => {
  switch (item?.type) {
    case "link":
      return (
        <Link
          className={`flex items-center align-center w-full gap-2 text-sm hover:text-secondary transition-all duration-300 px-3 py-2 font-medium ${
            activeKey === item.key ? "text-primary font-medium" : ""
          }`}
          key={item.key}
          href={item.path}
        >
          <span className="flex text-primary h-fit">{item.icon}</span>
          {item.name}
        </Link>
      );
    case "separator":
      return (
        <span
          className="flex w-full h-px bg-gray-200 my-1"
          key={item.key}
        ></span>
      );
    case "section":
      return (
        <Collapse
          items={[
            {
              ...item,
              key: item.key,
              icon: undefined,
              label: (
                <p
                  className={`flex items-center align-center w-full gap-2 text-sm hover:text-secondary transition-all duration-300 px-3 py-2 font-medium ${
                    item?.children?.find((child) => activeKey == child.key)
                      ? "text-primary font-medium"
                      : ""
                  }`}
                >
                  <span className="text-primary flex h-fit">{item.icon}</span>
                  {item.name}
                </p>
              ),
              type: undefined,
              children: item?.children?.map((child) => (
                <MenuItem item={child} key={child.key} activeKey={activeKey} />
              )),
              className:
                "flex flex-wrap items-center align-center w-full h-fit transition-all duration-300",
            },
          ]}
          className="w-full h-fit border-0 drop-sahdow-none bg-transparent p-0 m-0 "
          ghost
          defaultActiveKey={
            item?.children?.find((child) => child.key == activeKey)
              ? [item.key]
              : null
          }
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <span className="pr-4 text-xs">
              {isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </span>
          )}
        />
      );
    case "sub-menu":
      return (
        <Link
          className={`flex items-center align-center w-full gap-2 transition-all duration-300 pl-9 pr-3 py-1 `}
          key={item.key}
          href={item.path}
        >
          <span
            className={`w-full text-gray-600 hover:text-secondary ${
              activeKey === item.key ? "text-primary font-medium" : ""
            }`}
          >
            {item.name}
          </span>
        </Link>
      );
    default:
      return item?.children;
  }
};

const SidebarMenu = ({ menu = SIDEBAR_MENU, activeKey = null }) => {
  return (
    <div className="flex flex-col gap-0.5 h-fit w-full">
      {menu?.map((item, index) => {
        return <MenuItem item={item} key={item.key} activeKey={activeKey} />;
      })}
    </div>
  );
};

const categories = [
  {
    key: 1,
    label: (
      <div className="flex flex-col w-56">
        <p>Thương hiệu</p>
        <ol className="ml-5">
          <li>
            <Link href="#">Dell</Link>
          </li>
          <li>
            <Link href="#">HP</Link>
          </li>
          <li>
            <Link href="#">Asus</Link>
          </li>
          <li>
            <Link href="#">LG</Link>
          </li>
          <li>
            <Link href="#">Microsoft</Link>
          </li>
        </ol>
      </div>
    ),
  },
  {
    key: 2,
    label: (
      <div className="flex flex-col w-56">
        <p className="">Nhu cầu</p>
        <ol className="ml-5">
          <li>
            <Link href="#">Văn phòng</Link>
          </li>
          <li>
            <Link href="#">Lập trình</Link>
          </li>
          <li>
            <Link href="#">Gaming</Link>
          </li>
          <li>
            <Link href="#">2D Design</Link>
          </li>
          <li>
            <Link href="#">3D Design</Link>
          </li>
        </ol>
      </div>
    ),
  },
  {
    key: 3,
    label: (
      <div className="flex flex-col w-56">
        <p className="">Khoảng giá</p>
        <ol className="ml-5">
          <li>
            <Link href="#">Dưới 10 triệu</Link>
          </li>
          <li>
            <Link href="#">Từ 10 - 20 triệu</Link>
          </li>
          <li>
            <Link href="#">Từ 20 - 30 triệu</Link>
          </li>
          <li>
            <Link href="#">Từ 30 - 40 triệu</Link>
          </li>
          <li>
            <Link href="#">Trên 40 triệu</Link>
          </li>
        </ol>
      </div>
    ),
  },
];

export { SidebarMenu };

export default function Categories({ data }) {
  const [brands, setBrands] = useState([]);
  const handleGetAllBrand = async () => {
    const { data } = await getAllBrand();
    setBrands(data);
  };
  useEffect(() => {
    if (data) {
      setBrands(data);
    } else {
      handleGetAllBrand();
    }
  }, [data]);
  return (
    <header className="flex justify-center px-5 gap-3 bg-white shrink-0">
      <div className="flex justify-between lg:max-w-5xl w-full items-center align-center gap-2 py-2">
        <Dropdown
          menu={{
            items: categories,
          }}
          trigger={["click"]}
        >
          <span className="hover:bg-gray-100 rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit lg:w-36 cursor-pointer">
            <AiOutlineUnorderedList className="text-xl text-gray-600" />
            <span className="hidden lg:block text-sm w-full">Danh mục</span>
          </span>
        </Dropdown>
        <div className="flex w-full overflow-x-auto">
          <div className="flex gap-2 w-fit min-w-full">
            {brands?.map((brand) => {
              return (
                <Link
                  href={`/products?brand=${brand?.name || "#"}`}
                  className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
                  key={brand.id}
                >
                  <Image
                    src={brand?.image}
                    alt={brand?.name}
                    className="w-8 h-8 object-contain c-brand-logo"
                    preview={false}
                  />
                  <span className="hidden md:block">{brand?.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
