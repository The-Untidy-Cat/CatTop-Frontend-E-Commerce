import getVariant from "@/services/variant";
import { formatCurrency } from "@/utils/currency";
import { Button, Image, InputNumber, Select, Skeleton, Spin, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { useUser } from "../Provider/AuthProvider";

export const CartItem = ({ item }) => {
  const {
    decreaseItemFromCart,
    incresaseItemFromCart,
    removeItemFromCart,
    updateItemFromCart,
    clearCart,
  } = useUser();
  const [loading, setLoading] = useState(false);
  const handleDecrease = () => {
    setLoading(true);
    decreaseItemFromCart(item).finally(() => setLoading(false));
  };
  const handleIncrease = () => {
    setLoading(true);
    incresaseItemFromCart(item).finally(() => setLoading(false));
  };
  const handleRemove = () => {
    setLoading(true);
    removeItemFromCart(item).finally(() => setLoading(false));
  };
  const handleUpdate = (value) => {
    setLoading(true);
    updateItemFromCart(item, value).finally(() => setLoading(false));
  };
  const handleClear = () => {
    setLoading(true);
    clearCart().finally(() => setLoading(false));
  };
  return (
    <Spin
      spinning={loading}
      className="flex items-center align-center justify-center w-full h-full"
    >
      <div className="flex flex-col gap-2 w-full h-fit pt-2">
        <div className="flex gap-3 w-full shrink-0">
          <Image
            src={item?.variant?.product?.image}
            alt={item?.variant?.product?.name}
            preview={false}
            className="w-20 shrink-0 h-20 object-cover rounded"
            rootClassName="w-20 shrink-0 h-20 object-cover rounded"
          />
          <div className="flex flex-col gap-1 w-full grow-0">
            <Link
              className="font-semibold w-full break-words"
              href={`/products/${item?.variant?.product?.slug}`}
            >
              {item?.variant?.product?.name}
            </Link>
            <p className="break-words bg-gray-100 w-fit p-2 text-sm rounded">
              {item?.variant?.name}
            </p>
            <div className="flex gap-1 w-full">
              <p className="text-red-600 font-semibold">
                {formatCurrency(item?.variant?.sale_price)}
              </p>
              {item?.variant?.discount > 0 && (
                <p className="flex gap-1 items-center text-sm text-gray-500">
                  <span className="line-through">
                    {formatCurrency(item?.variant?.standard_price)}
                  </span>
                  <span className="bg-secondary/[.2] text-primary font-medium rounded text-xs p-1">
                    -{Number(item?.variant?.discount) * 100}%
                  </span>
                </p>
              )}
            </div>
            <div className="flex justify-between items-center align-center gap-1 w-full">
              <div className="flex items-center align-center h-fit w-fit border rounded">
                <Button
                  type="text"
                  className="rounded-none h-full flex items-center justify-center align-center"
                  onClick={handleDecrease}
                  icon={<FaChevronLeft />}
                />
                <InputNumber
                  value={item?.amount}
                  min={1}
                  max={10}
                  step={1}
                  controls={false}
                  className="rounded-none font-semibold w-12 border-x"
                  bordered={false}
                  onChange={handleUpdate}
                />
                <Button
                  type="text"
                  className="rounded-none h-full flex items-center justify-center align-center"
                  onClick={handleIncrease}
                  icon={<FaChevronRight />}
                />
              </div>
              <Button
                type="text"
                onClick={handleRemove}
                icon={<FaTrashAlt />}
                className="flex items-center text-red-500"
              >
                Xoá
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};