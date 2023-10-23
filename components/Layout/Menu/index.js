// import { Collapse } from "antd";
// import Link from "next/link";
// import { AiOutlineHome } from "react-icons/ai";
// import { BiRightArrow, BiDownArrow } from "react-icons/bi";

// const NAVBAR_MENU = [
//   {
//     key: "home",
//     name: "Home",
//     path: "/",
//   },
//   {
//     key: "chat",
//     name: "Chat",
//     path: "#",
//   },
//   {
//     key: "order",
//     name: "Đơn hàng",
//     path: "#",
//   },
// ];

// const SIDEBAR_MENU = [
//   {
//     key: "home",
//     name: "Home",
//     path: "/",
//     type: "link",
//     icon: <AiOutlineHome />,
//   },
//   {
//     key: "separator-1",
//     type: "separator",
//   },
//   {
//     key: "section-1",
//     name: "Section 1",
//     type: "section",
//     icon: <AiOutlineHome />,
//     children: [
//       {
//         key: "home1",
//         name: "Home",
//         path: "/",
//         type: "sub-menu",
//       },
//     ],
//   },
// ];

// const NavbarMenu = () => {
//   return (
//     <div className="flex items-center align-center gap-2 ml-2">
//       {NAVBAR_MENU?.map((item, index) => (
//         <Link
//           className="text-gray-500 text-sm font-medium hover:text-primary transition-all duration-300 px-3"
//           key={item.key}
//           href={item.path}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// };

// const MenuItem = ({ item }) => {
//   switch (item.type) {
//     case "link":
//       return (
//         <Link
//           className="flex items-center align-center w-full gap-2 text-sm hover:text-primary transition-all duration-300 px-5 py-3 font-normal text-gray-900"
//           key={item.key}
//           href={item.path}
//         >
//           <span className="flex text-primary text-lg  h-fit">{item.icon}</span>
//           {item.name}
//         </Link>
//       );
//     case "separator":
//       return (
//         <span
//           className="flex w-full h-px bg-gray-200 my-1"
//           key={item.key}
//         ></span>
//       );
//     case "section":
//       return (
//         <Collapse
//           items={[
//             {
//               ...item,
//               icon: undefined,
//               label: (
//                 <p className="flex items-center align-center w-full gap-2 text-sm hover:text-primary transition-all duration-300 px-5 py-3 font-normal text-gray-900">
//                   <span className="text-primary text-lg flex h-fit">
//                     {item.icon}
//                   </span>
//                   {item.name}
//                 </p>
//               ),
//               type: undefined,
//               children: item?.children?.map((child) => (
//                 <MenuItem item={child} key={child.key} />
//               )),
//               className:
//                 "flex flex-wrap items-center align-center w-full h-fit hover:text-primary transition-all duration-300",
//             },
//           ]}
//           className="w-full h-fit border-0 drop-sahdow-none bg-transparent p-0 m-0 "
//           ghost
//           expandIconPosition="end"
//           expandIcon={({ isActive }) => (
//             <span className="pr-4">{isActive ? <BiDownArrow /> : <BiRightArrow />}</span>
//           )}
//         />
//       );
//     case "sub-menu":
//       return (
//         <Link
//           className="flex items-center align-center w-full gap-2 hover:bg-primary/[.1] transition-all duration-300 pl-12 pr-3 py-1"
//           key={item.key}
//           href={item.path}
//         >
//           <span className="w-full text-gray-600 hover:text-primary">
//             {item.name}
//           </span>
//         </Link>
//       );
//   }
// };

// const SidebarMenu = () => {
//   return (
//     <div className="flex flex-col h-fit w-full">
//       {SIDEBAR_MENU?.map((item, index) => {
//         return <MenuItem item={item} key={item.key} />;
//       })}
//     </div>
//   );
// };

import { Dropdown, Pagination } from "antd";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import Link from "next/link";
import { GiLaptop } from "react-icons/gi";

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

export default function Categories() {
  return (
    <header className="flex justify-center px-5 gap-3 sticky top-0 bg-white shrink-0">
      <div className="flex justify-between lg:max-w-4xl w-full items-center align-center gap-2 py-2">
        <Dropdown
          menu={{
            items: categories,
          }}
          trigger={["click", 'hover']}
        >
          <span className="hover:bg-gray-100 rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit">
            <AiOutlineUnorderedList className="text-xl text-gray-600" />
            <span className="hidden lg:block text-sm">Danh mục</span>
          </span>
        </Dropdown>
        <div className="flex gap-2">
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">DELL</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">HP</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">ASUS</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">LG</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">Microsoft</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">ACER</span>
          </Link>
          <Link
            href="#"
            className="hover:bg-secondary/[.2] rounded-md px-3 py-2.5 text-sm font-semibold flex justify-center items-center align-center text-gray-900 gap-2 w-fit"
          >
            <GiLaptop className="text-2xl text-gray-600" />
            <span className="hidden lg:block">Lenovo</span>
          </Link>
          {/* <Link
          href="#"
          className="hover:bg-secondary/[.2] font-thin flex justify-center items-center align-center text-gray-900 gap-2"
        >
          <AiOutlineLeft className="hover:bg-blue text-2xl text-gray-600" />
        </Link>
        <Link
          href="#"
          className=" font-semibold flex justify-center items-center align-center text-gray-900 gap-2"
        >
          <AiOutlineRight className="text-2xl text-gray-600" />
        </Link> */}
        </div>
      </div>
    </header>
  );
}
