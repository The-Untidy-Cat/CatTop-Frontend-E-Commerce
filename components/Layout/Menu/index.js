import { Dropdown, Image, Pagination } from "antd";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import Link from "next/link";
import { GiLaptop } from "react-icons/gi";
import { getAllBrand } from "@/services/brand";
import { useEffect, useState } from "react";

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
      <div className="flex justify-between lg:max-w-4xl w-full items-center align-center gap-2 py-2">
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
        <div className="flex relative w-full overflow-x-auto">
          <div className="flex gap-2 w-fit min-w-full">
            {brands?.map((brand) => {
              return (
                <Link
                  href={`/search?brand=${brand?.name|| "#"}`}
                  className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
                  key={brand.id}
                >
                  <Image
                    src={brand?.image}
                    alt={brand?.name}
                    className="w-8 h-8 object-contain"
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
