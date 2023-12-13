import { Button, Dropdown, Image, Popover } from "antd";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { getAllBrand } from "@/services/brand";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "antd";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { PRICE_LIST } from "@/app.config";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

export const SidebarMenu = ({ menu, activeKey = null }) => {
  return (
    <div className="flex flex-col gap-0.5 h-fit w-full">
      {menu?.map((item, index) => {
        return <MenuItem item={item} key={item.key} activeKey={activeKey} />;
      })}
    </div>
  );
};

const CategoriesMenu = ({ data }) => {
  return (
    <div className="grid md:grid-flow-col md:auto-cols-max h-full w-full p-1">
      <div className="flex flex-col gap-1 px-2">
        <p className="text-sm font-semibold text-gray-900">Thương hiệu</p>
        <div className="grid grid-cols-2 gap-x-2">
          {data?.map((item, index) => {
            return (
              <Link
                href={{
                  pathname: "/products",
                  query: { brand: item?.name || "#" },
                }}
                key={item.id}
                className="font-medium text-sm text-gray-600 hover:text-primary transition-all duration-300 py-0.5"
              >
                {item?.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-2">
        <p className="text-sm font-semibold text-gray-900">Khoảng giá</p>
        <div className="grid grid-cols-2 gap-x-2">
          {PRICE_LIST.map((item, index) => {
            return (
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    price: item?.key || undefined,
                  },
                }}
                key={item?.key}
                className="font-medium text-sm text-gray-600 hover:text-primary transition-all duration-300 py-0.5"
              >
                {item?.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function CategoriesBar({ data }) {
  const [brands, setBrands] = useState([]);
  const brandSlider = useRef(null);

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

  const handleScrollLeft = () => {
    brandSlider.current.scrollLeft -= 100;
  };

  const handleScrollRight = () => {
    brandSlider.current.scrollLeft += 100;
  };
  return (
    <header className="flex justify-center px-5 gap-3 bg-white shrink-0 h-16">
      <div className="flex justify-between lg:max-w-5xl w-full items-center align-center gap-2 py-2">
        <Popover
          content={<CategoriesMenu data={brands} />}
          trigger={"click"}
          placement="bottomLeft"
        >
          <Button
            type="text"
            className="flex items-center py-6"
            icon={<AiOutlineUnorderedList />}
          >
            <span className="hidden lg:block text-sm w-full font-semibold">
              Danh mục
            </span>
          </Button>
        </Popover>
        <div className="flex items-center align-center grow-0 gap-1">
          <div className="flex w-full h-full grow-0 overflow-hidden" ref={brandSlider}>
            <div className="flex flex-nowrap gap-2 w-fit">
              {brands?.map((brand) => {
                return (
                  <Link
                    href={`/products?brand=${brand?.name || "#"}`}
                    className="hover:bg-secondary/[.2] rounded-md px-3 py-2 text-sm font-semibold flex justify-start items-center align-center text-gray-900 gap-2 w-fit shrink-0"
                    key={brand.id}
                  >
                    <Image
                      src={brand?.image}
                      alt={brand?.name}
                      className="h-5 shrink-0"
                      preview={false}
                    />
                    {/* <span className="hidden md:block">{brand?.name}</span> */}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center align-center gap-2 shrink-0">
            <Button size="small" type="text" className="p-0 flex items-center" onClick={handleScrollLeft}><FaChevronLeft/></Button>
            <Button size="small" type="text" className="p-0 flex items-center" onClick={handleScrollRight}><FaChevronRight/></Button>
          </div>
        </div>
      </div>
    </header>
  );
}
