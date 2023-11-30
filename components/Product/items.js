import { formatCurrency } from "@/utils/currency";
import { Image, Tag } from "antd";
import Link from "next/link";

export default function ProductItems({ data }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <Link href={`/products/${data?.slug}`} className="flex flex-col items-center text-gray-900">
        <Image src={data?.image} alt={data?.name} preview={false} />
        <div className="mt-2">
          <p className="font-semibold text-black text-xs md:text-sm mb-2">{data?.name}</p>
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
    </div>
  );
}
