import { FcPodiumWithoutSpeaker } from "react-icons/fc";
import { useUser } from "../Provider/AuthProvider";
import { CartItem } from "./item";
import { Button, Empty } from "antd";
import { formatCurrency } from "@/utils/currency";
import { useEffect } from "react";
export default function Cart() {
  const { cart, loadingCart } = useUser();
  useEffect(() => {
    console.log(cart);
  }, []);
  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-8 w-full">
      <div className="bg-white rounded p-5 w-full md:w-7/12 shrink-0">
        <p className="font-semibold text-lg mb-3">Giỏ hàng ({cart?.length})</p>
        <section className="flex flex-col divide-y gap-3">
          {cart?.length > 0 ? (
            cart?.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })
          ) : (
            <Empty
              description="Không có sản phẩm nào trong giỏ hàng"
              className="w-full"
              image={<FcPodiumWithoutSpeaker className="text-[150px]" />}
            />
          )}
        </section>
      </div>
      <div className="flex flex-col rounded p-5 gap-2 w-full bg-white md:sticky md:top-24">
        <p className="font-semibold text-lg">Tóm tắt đơn hàng</p>
        <p className="flex justify-between gap-1 m-0">
          Giảm giá:
          <span className="font-semibold">
            {formatCurrency(
              cart.length > 0
                ? cart
                    ?.map(
                      (item) =>
                        item?.variant?.discount *
                        item?.amount *
                        item?.variant?.standard_price
                    )
                    ?.reduce((total, item) => {
                      return total + item;
                    })
                : 0
            )}
            đ
          </span>
        </p>
        <div className="border-t border-dashed"></div>
        <p className="flex justify-between gap-1 m-0">
          Tổng tiền:
          <span className="text-lg font-semibold text-red-500">
            {formatCurrency(
              cart.length > 0
                ? cart
                    ?.map((item) => item?.amount * item?.variant?.sale_price)
                    ?.reduce((total, item) => {
                      return total + item;
                    })
                : 0
            )}
            đ
          </span>
        </p>
        <p className="m-0 text-gray-500 text-xs italic">
          Đã bao gồm phụ phí và thuế VAT
        </p>
        <Button className="bg-primary text-white" loading={loadingCart}>Đặt hàng</Button>
      </div>
    </div>
  );
}
