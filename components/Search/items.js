import { formatCurrency } from "@/utils/currency";
import { Image } from "antd";
import Link from "next/link";

export default function SearchItems({ data }) {
  return (
    <Link
      key={data?.slug}
      href={`/products/${data?.slug}`}
      className="flex gap-1 w-full py-2"
    >
      <Image
        src={data?.image}
        alt={data?.slug}
        className="w-24"
        preview={false}
      />
      <div className="flex flex-col gap-1 w-full">
        <p className="m-0 font-semibold">{data?.name}</p>
        <p className="flex items-center align-center m-0 text-sm gap-1">
          {data?.discount > 0 ? (
            <>
              <span className="text-red-500 font-medium">
                {formatCurrency(data?.sale_price)}
              </span>
              <span className="text-gray-600 line-through">
                {formatCurrency(data?.standard_price)}
              </span>
              <span className="bg-secondary/[.2] text-primary font-medium rounded text-xs p-1">
                -{Number(data?.discount) * 100}%
              </span>
            </>
          ) : (
            <span className="text-red-500">
              {formatCurrency(data?.sale_price)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
