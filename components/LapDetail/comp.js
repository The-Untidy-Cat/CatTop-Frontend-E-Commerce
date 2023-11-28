import { Button, Form, Image, InputNumber, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { OFFLINE_STORES } from "@/app.config";
import { Input } from "antd";
import Link from "next/link";
import {
  FaAngleRight,
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { formatCurrency } from "@/utils/currency";

export default function ProductDetail({ data }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(data?.variants?.[0]);
  const increase = () => {
    const quantity = form.getFieldValue("quantity");
    if (quantity < 10) form.setFieldsValue({ quantity: quantity + 1 });
  };
  const decrease = () => {
    const quantity = form.getFieldValue("quantity");
    if (quantity > 1) form.setFieldsValue({ quantity: quantity - 1 });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImage = (event) => {
    const src = event.target.getAttribute("src");
    setImg(src);
  };
  const handleChangeVariant = (event) => {
    const variant = data?.variants?.find(
      (item) => item.id === event.target.value
    );
    setCurrentVariant(variant);
  };
  const handleBuy = (value) => {
    console.log(value);
  };
  useEffect(() => {}, [data]);
  return (
    <div className="flex gap-5 w-full h-fit grow-0 shrink-0">
      <div className="flex flex-col gap-2 w-full h-fit grow-0">
        <div className="flex bg-white md:[h-100px] lg:h-[500px] px-4 py-8">
          <div className="flex flex-col overflow-y-scroll h-full w-3/12 gap-5 p-2 lg:p-4">
            {data?.variants?.map((variant, index) => {
              return (
                <Image
                  key={"img" + index}
                  src={variant?.image}
                  alt={variant?.name}
                  preview={false}
                  className="cursor-pointer focus:ring-2 focus:rounded focus:ring-primary/[.5] p-2"
                  onClick={handleImage}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col bg-white gap-2 p-4">
          <div className="border-b py-4">
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Cấu hình đặc điểm</p>
              <a onClick={openModal}>Xem cấu hình chi tiết</a>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="h-screen w-screen bg-transparent flex justify-center items-center"
              >
                <div className="rounded-lg bg-white h-5/6 w-full md:w-8/12 lg:w-1/2 border p-8 grid grid-cols-1 gap-4 overflow-y-auto">
                  <div className=" flex justify-between items-start">
                    <p className="font-semibold text-xl">Cấu hình chi tiết</p>
                    <button className="ext-xl font-bold" onClick={closeModal}>
                      X
                    </button>
                  </div>
                  <div className="grid grid-cols-2 grid-rows-6 gap-2">
                    <div className="">
                      <p className="font-semibold">Bộ xử lý</p>
                      <p>Loại CPU: Intel Core i5 1240P, 12C/16T</p>
                      <p>Tốc độ: 1.0GHz, Lên tới 4.4GHz</p>
                      <p>Bộ nhớ đệm: 12MB</p>
                    </div>
                    <div className="">
                      <p className="font-semibold">RAM</p>
                    </div>
                    <div className="">
                      <p className="font-semibold">Màn hình</p>
                    </div>
                    <div>
                      <p className="font-semibold">Pin</p>
                    </div>
                    <div>
                      <p className="font-semibold">Card đồ họa</p>
                    </div>
                    <div>
                      <p className="font-semibold">Ổ cứng</p>
                    </div>
                    <div>
                      <p className="font-semibold">Khối lượng và Kích thước</p>
                    </div>
                    <div>
                      <p className="font-semibold">Webcam và Âm thanh</p>
                    </div>
                    <div className="">
                      <p className="font-semibold">Cổng kết nối</p>
                    </div>
                    <div className="">
                      <p className="font-semibold">Kết nối</p>
                    </div>
                    <div className="">
                      <p className="font-semibold">Hệ điều hành</p>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="grid grid-cols-2 grid-rows-4 gap-4">
              <div>
                <p className="font-semibold">Bộ xử lý</p>
                <p>Loại CPU: Intel Core i5 1240P, 12C/16T</p>
                <p>Tốc độ: 1.0GHz, Lên tới 4.4GHz</p>
                <p>Bộ nhớ đệm: 12MB</p>
              </div>
              <div>
                <p className="font-semibold">RAM</p>
              </div>
              <div>
                <p className="font-semibold">Màn hình</p>
              </div>
              <div>
                <p className="font-semibold">Pin</p>
              </div>
              <div>
                <p className="font-semibold">Card đồ họa</p>
              </div>
              <div>
                <p className="font-semibold">Ổ cứng</p>
              </div>
              <div>
                <p className="font-semibold">Khối lượng và Kích thước</p>
              </div>
              <div>
                <p className="font-semibold">Webcam và Âm thanh</p>
              </div>
            </div>
          </div>
          <div className="grid border-b py-4">
            <p className="font-semibold text-lg">Sẵn hàng & trưng bày</p>
            <div className="text-primary">
              <p>{OFFLINE_STORES[0].name}</p>
              <p>{OFFLINE_STORES[0].address}</p>
            </div>
          </div>
          <div className="border-b py-4">
            <p className="font-semibold text-lg">Vận chuyển</p>
            <p className="text-primary">Miễn phí TP.HCM</p>
          </div>
          <div className="py-4">
            <p className="font-semibold text-lg">Bảo hành & đổi trả</p>
            <li className="text-primary">Bảo hành 12 tháng tại cửa hàng</li>
            <li className="text-primary">Đổi mới trong 15 ngày đầu tiên</li>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-4/12 lg:w-full lg:max-w-sm grow-0 shrink-0">
        <div className="sticky top-40 flex flex-col w-full gap-2 overflow-y-auto">
          <Form
            className="bg-white p-4 m-0"
            form={form}
            initialValues={{
              variant: data?.variants?.[0]?.id,
              quantity: 1,
            }}
            onFinish={handleBuy}
          >
            <div className="border-b pb-4">
              <p>SKU: {currentVariant?.sku}</p>
              <p className="font-semibold text-lg">{data?.name}</p>
            </div>
            <div className="grid grid-cols-1 py-4 gap-2 border-b">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-black/[.5]">Phiên bản</p>
                <Form.Item name="variant" className="m-0">
                  <Radio.Group
                    optionType="button"
                    buttonStyle="soild"
                    options={data?.variants?.map((item) => {
                      return { label: item.name, value: item.id };
                    })}
                    onChange={handleChangeVariant}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-black/[.5]">Số lượng</p>
                <div className="flex items-center align-center h-fit w-fit border rounded">
                  <Button
                    type="text"
                    className="rounded-none h-full flex items-center justify-center align-center"
                    onClick={decrease}
                    icon={<FaChevronLeft />}
                  />
                  <Form.Item name="quantity" className="m-0">
                    <InputNumber
                      min={1}
                      max={10}
                      step={1}
                      controls={false}
                      className="rounded-none font-semibold text-lg w-12 border-x"
                      bordered={false}
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    className="rounded-none h-full flex items-center justify-center align-center"
                    onClick={increase}
                    icon={<FaChevronRight />}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center align-center justify-between pt-4">
              <div className="block">
                <p className="text-red-600 text-lg font-semibold">
                  {formatCurrency(currentVariant?.sale_price)}
                </p>
                {currentVariant?.discount > 0 && (
                  <p className="flex gap-1 items-center text-sm text-gray-500">
                    <span className="line-through">
                      {formatCurrency(currentVariant?.standard_price)}
                    </span>
                    <span className="bg-secondary/[.2] text-primary font-medium rounded text-xs p-1">
                      -{Number(currentVariant?.discount) * 100}%
                    </span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 lg:flex-row lg:gap-0 items-center">
                <Button
                  type="text"
                  className="flex items-center gap-1 font-semibold text-primary"
                  icon={<FaCartPlus />}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center gap-1 bg-primary text-white"
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </Form>

          <div className="flex gap-2 justify-between items-center bg-white p-4">
            <Image
              src={data?.brand?.image}
              alt={data?.brand?.name}
              className="w-16"
            />{" "}
            <Link
              href={`/products?brand=${data?.brand?.name}`}
              className="flex items-center font-semibold text-primary"
            >
              Laptop {data?.brand?.name} <FaAngleRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
