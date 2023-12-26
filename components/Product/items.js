import { formatCurrency } from "@/utils/currency";
import { Image, Tag } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductItems({ data }) {
  return (
    <motion.div className="flex flex-col w-full h-full bg-white rounded-lg p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    >
      <Link
        href={`/products/${data?.slug}`}
        className="flex flex-col items-start w-full text-gray-900"
      >
        <Image src={data?.image} alt={data?.name} preview={false} />
        <div className="mt-2 w-full">
          <p className="font-semibold text-black text-xs md:text-sm mb-2">
            {data?.name}
          </p>
          <p className="flex gap-1 items-center align-center">
            Từ:
            <span className="text-base text-red-500 font-semibold">
              {formatCurrency(data?.sale_price)}
            </span>
            {data?.discount > 0 && (
              <span className="bg-secondary/[.2] text-primary font-medium rounded text-xs p-1">
                -{Number(data?.discount) * 100}%
              </span>
            )}
          </p>
          <p className="flex gap-1 text-sm">
            Màu:
            {data?.variants?.map((variant, index) => (
              <Tag key={index}>{variant?.color}</Tag>
            ))}
          </p>
          <div className="border-b border-gray my-4"></div>
          <div className="text-black text-xs">
            <p>CPU: {data?.variants?.[0]?.cpu}</p>
            <p>RAM: {data?.variants?.[0]?.ram}</p>
            <p>Ổ cứng: {data?.variants?.[0]?.storage}</p>
            <p>Màn hình: {data?.variants?.[0]?.display}</p>
            <p>Card: {data?.variants?.[0]?.card}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
