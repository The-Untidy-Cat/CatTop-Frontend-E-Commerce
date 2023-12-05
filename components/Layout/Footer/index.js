import Image from "next/image";
import logo from "@/public/logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import {
  AiFillGithub,
  AiOutlineCopyrightCircle,
  AiFillClockCircle,
} from "react-icons/ai";
import uit from "@/public/uit.png";
import { OFFLINE_STORES } from "@/app.config";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <footer className="block border-b px-5 py-4 md:py-7 bg-primary/[.4] w-full h-fit grow-0">
      <div className="grid grid-cols-1 md:grid-cols-2 content-center lg:max-w-5xl w-full gap-3 md:gap-5 h-fit m-auto">
        <div className="flex flex-col">
          <div className="flex items-center align-center gap-2">
            <Image src={logo} className="w-10 md:w-16" alt="logo" />
            <p className="text-[#58585B] font-bold text-xl md:text-3xl">
              CatTop
            </p>
          </div>
          <p className="text-primary text-base font-bold py-2">
            HỆ THỐNG CỬA HÀNG
          </p>
          {OFFLINE_STORES.map((item, index) => {
            return (
              <div className="flex flex-col gap-0.5 text-gray-900" key={index}>
                <p className="m-0 font-semibold text-sm capitalize">
                  {item.name}
                </p>
                <p className="m-0 flex items-center align-center gap-1 text-sm pt-2">
                  <FaMapMarkerAlt className="m-0 p-0 text-lg text-primary" />
                  {item.address}
                </p>
                <p className="m-0 flex items-center align-center gap-1 text-sm pt-2">
                  <IoCallSharp className="m-0 p-0 text-lg text-primary" />
                  {
                    <Link
                      href={`tel:${item.phone}`}
                      className="text-gray-900 hover:text-primary"
                    >
                      {item.phone}
                    </Link>
                  }
                </p>
                <p className="m-0 flex items-center align-center gap-1 text-sm pt-2">
                  <AiFillClockCircle className="m-0 p-0 text-lg text-primary" />
                  {item.openTime}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col h-full gap-2 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-primary text-base font-bold uppercase">
              thông tin hữu ích
            </p>
            <ol className="flex flex-col gap-1 font-medium text-sm mb-2">
              <li>
                <Link
                  className="text-gray-900 hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-900 hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Chính sách đổi trả/bảo hành
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-900 hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Chính sách mua hàng
                </Link>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-1 text-xs text-gray-900">
            <p className="flex items-center align-center m-0 gap-1">
              <AiOutlineCopyrightCircle className="text-sm" /> The Untidy Cat
              2023
            </p>
            <p className="m-0 mb-2">
              ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH<br></br>
              TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VNUHCM - UIT
            </p>

            <span className="flex gap-2">
              <Image src={uit} className="w-6" alt="logo" />
              <AiFillGithub className="text-3xl" />
            </span>
          </div>
        </div>
      </div>
      {String(pathname)?.includes("/products/") == true && (
        <div className="h-28 w-full" />
      )}
    </footer>
  );
}
