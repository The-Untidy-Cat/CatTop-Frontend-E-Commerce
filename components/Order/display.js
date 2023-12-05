import { getOrders } from "@/services/order";
import { Empty, Image, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { CartItem } from "../Cart/item";
import { formatCurrency } from "@/utils/currency";

const OrderCard = ({ order }) => {
  return (
    <div className="flex flex-col divide-y border rounded">
      <div className="flex justify-between items-center bg-secondary/[.2] text-gray-900 p-2">
        <p className="m-0 text-sm">Mã đơn hàng: #{order?.id}</p>
        <p className="m-0 text-sm">
          Ngày đặt hàng: {new Date(order?.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-col divide-y">
        {order?.items?.map((item) => (
          <div className="flex gap-1 p-2">
            <Image
              src={item?.variant?.product?.image}
              alt={item?.variant?.product?.name}
              preview={false}
              className="w-20 shrink-0 h-20 object-cover rounded"
              rootClassName="w-20 shrink-0 h-20 object-cover rounded"
            />
            <div className="flex flex-col gap-1 w-full">
              <p className="font-semibold w-full break-words">
                {item?.variant?.product?.name}
              </p>
              <div className="flex justify-between">
                <div className="m-0">
                  <p className="p-1 rounded bg-gray-100 text-xs w-fit">
                    {item?.variant?.name}
                  </p>
                  <p className="m-0 text-sm">Số lượng: {item?.amount}</p>
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
        ))}
      </div>
      <div className="flex justify-end items-center p-2">
        <p className="m-0 text-sm">
          Tổng tiền:{" "}
          <span className="font-bold">{formatCurrency(order?.total)}</span>
        </p>
        {/* <p className="m-0 text-sm">Trạng thái: {order?.state}</p> */}
      </div>
    </div>
  );
};

const OrderGroup = ({ data }) => {
  return (
    <div className="flex flex-col gap-1">
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
      key: "pending",
      label: "Chờ xác nhận",
      children: (
        <OrderGroup
          data={orders?.filter((order) => order?.state == "pending") || []}
        />
      ),
    },
    {
      key: "confirmed",
      label: "Chờ giao hàng",
      children: (
        <OrderGroup
          data={orders?.filter((order) => order?.state == "confirmed") || []}
        />
      ),
    },
    {
      key: "delivering",
      label: "Giao hàng",
      children: (
        <OrderGroup
          data={orders?.filter((order) => order?.state == "delivering") || []}
        />
      ),
    },
    {
      key: "delivered",
      label: "Đã giao",
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
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Đơn hàng</h1>
      <Spin spinning={loading} className="m-auto">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          // className="c-tabs"
        />
      </Spin>
    </div>
  );
}
