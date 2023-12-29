import { getOrders } from "@/services/order";
import { Empty, Image, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { CartItem } from "../Cart/item";
import { formatCurrency } from "@/utils/currency";
import Link from "next/link";
import { ORDER_STATE } from "@/app.config";

const OrderItem = ({ item }) => {
  return (
    <div className="flex gap-2 p-2">
      <Image
        src={item?.variant?.product?.image}
        alt={item?.variant?.product?.name}
        preview={false}
        className="w-20 md:w-24 shrink-0 object-cover rounded"
      />
      <div className="flex flex-col w-full">
        <Link
          className="font-semibold w-full break-words"
          href={`/products/${item?.variant?.product?.slug}`}
        >
          {item?.variant?.product?.name}
        </Link>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 m-0">
            <p className="p-1 rounded bg-gray-100 text-xs w-fit">
              {item?.variant?.name}
            </p>
            <p className="m-0 text-sm font-medium">Số lượng: {item?.amount}</p>
          </div>
          <div className="m-0 text-sm">
            {item?.standard_price > item?.sale_price && (
              <p className="line-through text-gray-400">
                {formatCurrency(item?.standard_price)}
              </p>
            )}
            <p className="text-red-600 font-semibold">
              {formatCurrency(item?.sale_price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <Link
      href={`/user/orders/${order?.id}`}
      className="flex flex-col divide-y border rounded"
    >
      <div className="flex justify-between items-center bg-secondary/[.2] text-gray-900 p-2">
        <p className="m-0 text-sm">Mã đơn hàng: #{order?.id}</p>
        <p className="m-0 text-sm">
          Ngày đặt hàng: {new Date(order?.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-col divide-y">
        {order?.items?.map((item) => (
          <OrderItem item={item} key={item?.variant?.id} />
        ))}
      </div>
      <div className="flex justify-between items-center p-2">
        <p className="m-0 text-sm text-primary font medium">
          {ORDER_STATE[order?.state] || "Không xác định"}
        </p>
        <p className="m-0 text-sm font-medium">
          Tổng tiền:{" "}
          <span className="font-bold">{formatCurrency(order?.total)}</span>
        </p>
        {/* <p className="m-0 text-sm">Trạng thái: {order?.state}</p> */}
      </div>
    </Link>
  );
};

const OrderGroup = ({ data }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {data?.length ? (
        data?.map((order) => <OrderCard order={order} />)
      ) : (
        <Empty description="Không có thông tin" />
      )}
    </div>
  );
};

export default function OrderView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    getOrders()
      .then((res) => {
        setOrders(res?.data?.orders || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onChange = (key) => {
    getData();
  };

  const items = [
    {
      key: "all",
      label: "Tất cả",
      children: <OrderGroup data={orders} />,
    },
    {
      key: "pending",
      label: "Chờ xác nhận",
      children: (
        <OrderGroup
          data={orders?.filter((order) => order?.state == "pending") || []}
        />
      ),
    },
    {
      key: "delivering",
      label: "Vận chuyển",
      children: (
        <OrderGroup
          data={
            orders?.filter((order) =>
              ["confirmed", "delivering"].includes(order?.state)
            ) || []
          }
        />
      ),
    },
    {
      key: "delivered",
      label: "Hoàn thành",
      children: (
        <OrderGroup
          data={orders?.filter((order) => order?.state == "delivered") || []}
        />
      ),
    },
    {
      key: "cancel-refund-return",
      label: "Huỷ/Trả hàng",
      children: (
        <OrderGroup
          data={
            orders?.filter((order) =>
              ["cancelled", "refunded", "failed"].includes(order?.state)
            ) || []
          }
        />
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 grow-0">
      <h1 className="text-lg font-semibold">Đơn hàng</h1>
      <div className="flex flex-col w-full grow-0 overflow-hidden">
        <Spin spinning={loading} className="m-auto w-full">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="w-fit min-w-full"
            rootClassName="w-full"
          />
        </Spin>{" "}
      </div>
    </div>
  );
}

export { OrderItem, OrderCard, OrderGroup };
