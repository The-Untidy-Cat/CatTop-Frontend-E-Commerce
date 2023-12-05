import {
  Button,
  Carousel,
  Form,
  Image,
  InputNumber,
  Modal,
  Popover,
  Radio,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { OFFLINE_STORES } from "@/app.config";
import Link from "next/link";
import {
  FaAngleRight,
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { formatCurrency } from "@/utils/currency";
import { useUser } from "../Provider/AuthProvider";
import { QuickLoginForm } from "../Form/Authentication/login";
import { useRouter } from "next/router";

function VariantSpecification({ variant }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="h-screen w-screen bg-transparent flex justify-center items-center"
      >
        <div className="rounded-lg bg-white rounded h-5/6 w-full md:w-8/12 lg:w-1/2 border p-8 grid grid-cols-1 gap-4 overflow-y-auto">
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
      <div className="flex flex-col bg-white rounded gap-2 p-4">
        <div className="border-b py-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Cấu hình đặc điểm</p>
            <Button type="text" onClick={openModal}>
              Chi tiết
            </Button>
          </div>
          <div className="hidden md:grid grid-cols-2 grid-rows-4 gap-4">
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
    </>
  );
}

export default function ProductDetail({ data }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { addItemToCart, user } = useUser();

  const [img, setImg] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(data?.variants?.[0]);
  const [loading, setLoading] = useState(false);

  const increase = () => {
    const amount = form.getFieldValue("amount");
    if (amount < 10) form.setFieldsValue({ amount: amount + 1 });
  };
  const decrease = () => {
    const amount = form.getFieldValue("amount");
    if (amount > 1) form.setFieldsValue({ amount: amount - 1 });
  };

  const handleImage = (index) => {
    setImg(index);
  };

  const handleChangeVariant = (event) => {
    const variant = data?.variants?.find(
      (item) => item.id === event.target.value
    );
    setCurrentVariant(variant);
  };

  const handleBuy = (value) => {
    setLoading(true);
    router.push({
      pathname: "/checkouts",
      query: {
        variant_id: value?.variant_id,
        amount: value?.amount,
      },
    });
  };
  const addToCart = async () => {
    setLoading(true);
    const value = form.getFieldsValue();
    addItemToCart(value).finally(() => setLoading(false));
  };
  useEffect(() => {
    if (data?.variants?.length <= 0 || data?.state !== "published") {
      Modal.warning({
        title: "Sản phẩm này hiện tại không có sẵn",
        okButtonProps: {
          disabled: true,
          hidden: true,
        },
        cancelButtonProps: {
          disabled: true,
          hidden: true,
        },
        centered: true,
        content: <Link href="/products">Sản phẩm khác</Link>,
      });
      return;
    }
  }, [data]);
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full h-fit grow-0 shrink-0">
      <div className="flex flex-col gap-2 w-full h-fit grow-0">
        <div className="hidden md:flex bg-white rounded p-2 md:p-3 lg:p-4 gap-1">
          <div className="flex flex-col overflow-y-scroll h-full w-2/12 lg:max-w-20 shrink-0 gap-1">
            {data?.variants?.map((variant, index) => {
              return (
                <div
                  key={"img-" + index}
                  className={
                    img == index
                      ? "flex border-2 border-secondary h-fit rounded"
                      : "h-fit"
                  }
                >
                  <Image
                    src={variant?.image}
                    alt={variant?.name}
                    preview={false}
                    className="cursor-pointer m-0 aspect-square"
                    onClick={() => handleImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <Image
            src={data?.variants?.[img]?.image}
            alt={data?.variants?.[img]?.name}
            preview={true}
            className="cursor-pointer w-full"
          />
        </div>
        <Carousel
          afterChange={(value) => setImg(value)}
          className="block w-full h-full md:hidden"
          rootClassName={{
            "slick-list": "h-full",
            "slick-track": "h-full",
            "slick-slide": "h-full",
            "slick-slide > div": "h-full",
          }}
        >
          {data?.variants?.map((variant, index) => {
            return (
              <Image
                key={"img-" + index}
                src={variant?.image}
                alt={variant?.name}
                className="cursor-pointer m-0 aspect-square"
              />
            );
          })}
          <Image
            key={"img-"}
            src={
              "https://images.thinkgroup.vn/unsafe/fit-in/686x686/https://media-api-beta.thinkpro.vn/media/core/products/2022/6/13/xps139315%201.png"
            }
            alt={
              "https://images.thinkgroup.vn/unsafe/fit-in/686x686/https://media-api-beta.thinkpro.vn/media/core/products/2022/6/13/xps139315%201.png"
            }
            className="cursor-pointer m-0 aspect-square"
          />
        </Carousel>
        <div className="hidden md:block w-full h-fit">
          <VariantSpecification variant={currentVariant} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-4/12 lg:w-full lg:max-w-sm grow-0 shrink-0">
        <div className="md:sticky md:top-40 flex flex-col w-full gap-2 overflow-y-auto">
          <Form
            className="bg-white rounded p-4 m-0"
            form={form}
            initialValues={{
              variant_id: data?.variants?.[0]?.id,
              amount: 1,
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
                <Form.Item name="variant_id" className="m-0">
                  <Radio.Group
                    optionType="button"
                    onChange={handleChangeVariant}
                    buttonStyle="solid"
                    className="flex flex-wrap gap-2 c-variant-radio-group"
                  >
                    {data?.variants?.map((item) => {
                      return (
                        <Radio.Button
                          key={item.id}
                          value={item.id}
                          className="border text-xs font-medium w-fit h-fit rounded p-2"
                        >
                          {item.name}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
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
                  <Form.Item name="amount" className="m-0">
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
            <div className="fixed left-0 bottom-0 z-50 w-screen p-5 bg-white drop-shadow md:w-full md:static md:top-0 md:z-0 md:p-0 md:bg-trasparent md:drop-shadow-none">
              <div className="flex items-center align-center justify-between">
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
                  <p className="m-0 text-gray-500 text-xs italic">
                    Gồm phụ phí và thuế VAT
                  </p>
                </div>
                {currentVariant?.state == "published" ? (
                  <div className="flex gap-1 flex-row md:flex-col lg:flex-row items-center">
                    {user ? (
                      <Button
                        type="text"
                        className="flex flex-col items-center gap-1 font-semibold text-primary text-sm h-fit"
                        icon={<FaCartPlus />}
                        onClick={addToCart}
                        loading={loading}
                      >
                        Thêm
                      </Button>
                    ) : (
                      <Popover
                        content={<QuickLoginForm onSuccess={addToCart} />}
                        title="Đăng nhập để thêm vào giỏ hàng"
                        trigger={"click"}
                      >
                        <Button
                          type="text"
                          className="flex flex-col items-center gap-1 font-semibold text-primary text-sm h-fit"
                          icon={<FaCartPlus />}
                        >
                          Thêm
                        </Button>
                      </Popover>
                    )}
                    {user ? (
                      <Button
                        htmlType="submit"
                        className="flex items-center gap-1 bg-primary text-white"
                        loading={loading}
                      >
                        Mua ngay
                      </Button>
                    ) : (
                      <Popover
                        content={<QuickLoginForm />}
                        title="Đăng nhập để mua hàng"
                        trigger={"click"}
                      >
                        <Button
                          htmlType="submit"
                          className="flex items-center gap-1 bg-primary text-white"
                        >
                          Mua ngay
                        </Button>
                      </Popover>
                    )}
                  </div>
                ) : (
                  <Tag color="red">Không có sẵn</Tag>
                )}
              </div>
            </div>
          </Form>
          <div className="block md:hidden w-full h-fit">
            <VariantSpecification variant={currentVariant} />
          </div>
          <div className="flex gap-2 justify-between items-center bg-white rounded p-4">
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