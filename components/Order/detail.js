import { Button, Modal, Input, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import Image from "next/image";
import logo from "@/public/uit.png";
import { Steps } from "antd";
import { useRouter } from "next/router";
import { getOrder } from "@/services/order";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import { ORDER_STATE, PAYMENT_METHOD, PROVINCES } from "@/app.config";
import moment from "moment";
import { FaBoxOpen, FaTruck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useUser } from "../Provider/AuthProvider";
import { OrderItem } from "./display";
import { formatCurrency } from "@/utils/currency";
import { BankingBox } from "../Payment";
import { ModalToggle } from "../Modal";
import { RatingForm } from "../Form/Rating";
const { TextArea } = Input;

export default function OrderDetailView() {
  const router = useRouter();
  const { query } = router;
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const getData = async () => {
    setLoading(true);
    getOrder(query.id)
      .then((res) => {
        if (!res?.data?.order) {
          router.push("/user/orders");
          return;
        }
        setOrder(res?.data?.order || {});
      })
      .catch((err) => {
        console.log(err);
        router.push("/user/orders");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Mở/Đóng modal đánh giá
  const [RateModal, setRateModal] = useState(false);
  const openRate = () => setRateModal(true);
  const closeRate = () => setRateModal(false);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Spin spinning={loading} rootClassName="m-auto bg-white w-full h-full">
      <div className="flex flex-col gap-3 w-full h-full">
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-primary">
            Đơn hàng: #{order?.id}
            <Tag
              className="ml-2"
              color={
                ["failed", "cancelled", "refunded"].includes(order?.state)
                  ? "red"
                  : order?.state == "delivered"
                  ? "green"
                  : "default"
              }
            >
              <span className="font-semi-bold">
                {ORDER_STATE[order?.state]}
              </span>
            </Tag>
          </p>
          <p className="flex gap-1 divide-x m-0 text-sm">
            <span className=" font-medium">
              Thời gian đặt:{" "}
              {moment(order?.created_at).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          </p>
        </div>
        <Steps
          size="small"
          labelPlacement="vertical"
          className="py-1"
          current={
            order?.state === "pending"
              ? 0
              : ["confirmed", "delivering"].includes(order?.state)
              ? 1
              : 2
          }
          items={[
            {
              title: <p className="font-semibold">Đặt hàng</p>,
              description: moment(
                order?.histories?.find(
                  (history) => history?.state === "pending"
                )?.created_at
              ).format("DD/MM/YYYY HH:mm:ss"),
              icon: <FaBoxOpen className="md:text-3xl" />,
            },
            {
              title: <p className="font-semibold">Vận chuyển</p>,
              description: (
                <div className="flex flex-col">
                  {order?.histories?.find((history) =>
                    ["confirmed", "delivering"].includes(history?.state)
                  )?.created_at && (
                    <p>
                      {" "}
                      {moment(
                        order?.histories?.find((history) =>
                          ["confirmed", "delivering"].includes(history?.state)
                        )?.created_at
                      ).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                  )}
                  {order?.tracking_no && (
                    <p>Mã vận đơn: {order?.tracking_no}</p>
                  )}
                </div>
              ),
              icon: <FaTruck className="md:text-3xl" />,
            },
            {
              title: <p className="font-semibold">Đã giao</p>,
              description:
                order?.histories?.find((history) =>
                  ["delivered"].includes(history?.state)
                )?.created_at &&
                moment(
                  order?.histories?.find((history) =>
                    ["delivered"].includes(history?.state)
                  )?.created_at
                ).format("DD/MM/YYYY HH:mm:ss"),
              icon: <FaCircleCheck className="md:text-3xl" />,
            },
          ]}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-primary">Thông tin nhận hàng</p>
          <p className="text-sm font-semibold">
            {order?.address?.name ||
              String(user?.last_name + " " + user?.first_name).trim()}
          </p>
          <p className="text-sm">
            {order?.address?.phone || user?.phone_number}
          </p>
          {order?.address?.address_line ? (
            <p className="text-sm">
              {order?.address?.address_line}
              <br />
              {`${
                PROVINCES.find((p) => p.code == order?.address?.province)
                  ?.districts?.find((d) => d.code == order?.address?.district)
                  ?.wards?.find((w) => w.code == order?.address?.ward)?.name
              }, ${
                PROVINCES.find(
                  (p) => p.code == order?.address?.province
                )?.districts?.find((d) => d.code == order?.address?.district)
                  ?.name
              }, ${
                PROVINCES.find((p) => p.code == order?.address?.province)?.name
              }`}
            </p>
          ) : (
            <p className="text-sm">Nhận tại cửa hàng</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-primary">Sản phẩm</p>
          <div className="flex flex-col gap-2">
            {order?.items?.map((item, index) => (
              <div className="block" key={item?.id}>
                <OrderItem item={item} />
                {order?.state === "delivered" && (
                  <ModalToggle
                    modal={{
                      title: "Đánh giá sản phẩm",
                    }}
                    button={{
                      label: "Đánh giá",
                      size: "small",
                      type: "default",
                      className: "float-right bg-primary text-white",
                    }}
                  >
                    <RatingForm data={{...item, order_id: order?.id}} onSuccess={getData} />
                  </ModalToggle>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-end items-end p-2 border-t">
          <p className="flex flex-col md:flex-row w-full gap-1 items-end justify-between m-0 text-sm">
            <span className="font-medium text-end w-full grow-0 ">
              Thành tiền:
            </span>
            <span className="font-semibold text-lg md:w-1/4 text-end shrink-0 text-red-500">
              {formatCurrency(order?.total)}
            </span>
          </p>
          <p className="flex flex-col md:flex-row w-full gap-1 items-end justify-between m-0 text-sm">
            <span className="font-medium text-end w-full grow-0 ">
              Phương thức thanh toán:
            </span>
            <span className="font-semibold md:w-1/4 text-end shrink-0">
              {PAYMENT_METHOD[order?.payment_method]}
            </span>
          </p>
        </div>
        {order?.state === "pending" && (
          <BankingBox
            amount={order?.total}
            description={`CatTop ${order?.id}`}
          />
        )}
      </div>
    </Spin>
  );
}
