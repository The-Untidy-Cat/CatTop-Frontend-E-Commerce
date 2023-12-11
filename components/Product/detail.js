import {
  Button,
  Carousel,
  Descriptions,
  Form,
  Image,
  InputNumber,
  Modal,
  Popover,
  Radio,
  Rate,
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
import { MobileView } from "react-device-detect";
import RateItems from "../Rate/items";

function VariantSpecification({ variant }) {
  const CPU = [
    {
      key: 1,
      label: "Loại CPU",
      children: variant?.specifications?.cpu?.name,
    },
    {
      key: 2,
      label: "Tốc độ",
      children: variant?.specifications?.cpu?.turbo_clock
        ? variant?.specifications?.cpu?.base_clock +
          " GHz, Lên tới " +
          variant?.specifications?.cpu?.turbo_clock +
          " GHz"
        : variant?.specifications?.cpu?.base_clock + " GHz",
    },
    {
      key: 3,
      label: "Bộ nhớ đệm",
      children: variant?.specifications?.cpu?.cache
        ? variant?.specifications?.cpu?.cache + " MB"
        : "",
    },
  ];
  const RAM = [
    {
      key: 1,
      label: "Loại RAM",
      children: variant?.specifications?.ram?.type,
    },
    {
      key: 2,
      label: "Dung lượng",
      children: variant?.specifications?.ram?.capacity
        ? variant?.specifications?.ram?.capacity / 1024 + " GB"
        : null,
    },
    {
      key: 3,
      label: "Tần số",
      children: variant?.specifications?.ram?.frequency
        ? variant?.specifications?.ram?.frequency + " MHz"
        : null,
    },
  ];
  const Display = [
    {
      key: 1,
      label: "Độ phân giải",
      children: variant?.specifications?.display?.resolution
        ? variant?.specifications?.display?.resolution + " px"
        : "",
    },
    {
      key: 2,
      label: "Tần số làm mới",
      children: variant?.specifications?.display?.refresh_rate
        ? variant?.specifications?.display?.refresh_rate + " Hz"
        : "",
    },
    {
      key: 3,
      label: "Công nghệ",
      children: variant?.specifications?.display?.technology,
    },
    {
      key: 4,
      label: "Cảm ứng",
      children: variant?.specifications?.display?.touch ? "Có" : "Không",
    },
  ];
  const GPU = [
    {
      key: 1,
      label: "Loại Card",
      children: variant?.specifications?.gpu?.type,
    },
    {
      key: 2,
      label: "Tên Card",
      children: variant?.specifications?.gpu?.name,
    },
    {
      key: 3,
      label: "Bộ nhớ",
      children: variant?.specifications?.gpu?.memory
        ? variant?.specifications?.gpu?.memory + " MB"
        : "",
    },
    {
      key: 4,
      label: "Tần số",
      children: variant?.specifications?.gpu?.frequency
        ? variant?.specifications?.gpu?.frequency + " MHz"
        : "",
    },
  ];
  const Storage = [
    {
      key: 1,
      label: "Dung lượng " + variant?.specifications?.storage?.drive,
      children: variant?.specifications?.storage?.capacity
        ? variant?.specifications?.storage?.capacity + " GB"
        : "",
    },
    {
      key: 2,
      label: "Loại",
      children: variant?.specifications?.storage?.type,
    },
  ];
  const Keyboard_Touchpad = [
    {
      key: 1,
      label: "Bàn phím",
      children: variant?.specifications?.keyboard,
    },
    {
      key: 2,
      label: "Touchpad",
      children: variant?.specifications?.touchpad ? "Có" : "Không",
    },
  ];
  const Other = [
    {
      key: 1,
      label: "Hệ điều hành",
      children: variant?.specifications?.os,
    },
    {
      key: 2,
      label: "Cổng kết nối",
      children: variant?.specifications?.ports,
    },
    {
      key: 3,
      label: "Pin",
      children: variant?.specifications?.battery
        ? variant?.specifications?.battery + " mAh"
        : "",
    },
    {
      key: 4,
      label: "Webcam",
      children: variant?.specifications?.webcam ? "Có" : "Không",
    },
    {
      key: 5,
      label: "Khối lượng",
      children: variant?.specifications?.weight
        ? variant?.specifications?.weight + " kg"
        : "",
    },
  ];
  return (
    <>
      <div className="flex flex-col bg-white rounded gap-2 p-4">
        <div className="border-b py-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Cấu hình đặc điểm</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-semibold">Bộ xử lý</p>
              <div className="grid grid-cols-7 gap-1">
                <p className="col-span-3">{CPU[0].label}</p>
                <p className="col-span-4">{CPU[0].children}</p>
                <p className="col-span-3">{CPU[1].label}</p>
                <p className=" col-span-4">{CPU[1].children}</p>
                <p className="col-span-3">{CPU[2].label}</p>
                <p className=" col-span-4">{CPU[2].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">RAM</p>
              <div className="grid grid-cols-5 gap-1">
                <p className="col-span-2">{RAM[0].label}</p>
                <p className="col-span-3">{RAM[0].children}</p>
                <p className="col-span-2">{RAM[1].label}</p>
                <p className=" col-span-3">{RAM[1].children}</p>
                <p className="col-span-2">{RAM[2].label}</p>
                <p className=" col-span-3">{RAM[2].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Màn hình</p>
              <div className="grid grid-cols-7 gap-1">
                <p className="col-span-3">{Display[0].label}</p>
                <p className="col-span-4">{Display[0].children}</p>
                <p className="col-span-3">{Display[1].label}</p>
                <p className=" col-span-4">{Display[1].children}</p>
                <p className="col-span-3">{Display[2].label}</p>
                <p className=" col-span-4">{Display[2].children}</p>
                <p className="col-span-3">{Display[3].label}</p>
                <p className=" col-span-4">{Display[3].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Card đồ họa</p>
              <div className="grid grid-cols-5 gap-1">
                <p className="col-span-2">{GPU[0].label}</p>
                <p className="col-span-3">{GPU[0].children}</p>
                <p className="col-span-2">{GPU[1].label}</p>
                <p className=" col-span-3">{GPU[1].children}</p>
                <p className="col-span-2">{GPU[2].label}</p>
                <p className=" col-span-3">{GPU[2].children}</p>
                <p className="col-span-2">{GPU[3].label}</p>
                <p className=" col-span-3">{GPU[3].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Ổ cứng</p>
              <div className="grid grid-cols-7 gap-1">
                <p className="col-span-3">{Storage[0].label}</p>
                <p className="col-span-4">{Storage[0].children}</p>
                <p className="col-span-3">{Storage[1].label}</p>
                <p className=" col-span-4">{Storage[1].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Bàn phím và Touchpad</p>
              <div className="grid grid-cols-5 gap-1">
                <p className="col-span-2">{Keyboard_Touchpad[0].label}</p>
                <p className="col-span-3">{Keyboard_Touchpad[0].children}</p>
                <p className="col-span-2">{Keyboard_Touchpad[1].label}</p>
                <p className=" col-span-3">{Keyboard_Touchpad[1].children}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Khác</p>
              <div className="grid grid-cols-7 gap-1">
                <p className="col-span-3">{Other[0].label}</p>
                <p className="col-span-4">{Other[0].children}</p>
                <p className="col-span-3">{Other[1].label}</p>
                <p className=" col-span-4">{Other[1].children}</p>
                <p className="col-span-3">{Other[2].label}</p>
                <p className=" col-span-4">{Other[2].children}</p>
                <p className="col-span-3">{Other[3].label}</p>
                <p className=" col-span-4">{Other[3].children}</p>
                <p className="col-span-3">{Other[4].label}</p>
                <p className=" col-span-4">{Other[4].children}</p>
              </div>
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
              <div className="flex md:mt-2 items-center align-center justify-between">
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
          <MobileView>
            <VariantSpecification variant={currentVariant} />
          </MobileView>
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
          <div className="flex flex-col gap-2 p-4 bg-white rounded h-fit">
            <div className="flex justify-between">
              <p className="sticky font-semibold text-lg top-0">
                Đánh giá (
                {data?.variants?.reduce((total, variant) => {
                  return total + variant?.reviews?.length;
                }, 0) || 0}
                )
              </p>
              <div className="flex gap-1">
                <Rate
                  allowHalf
                  value={
                    Number(
                      data?.variants?.reduce((total, variant) => {
                        return (
                          total +
                          variant?.reviews?.reduce((total, review) => {
                            return total + Number(review?.rating);
                          }, 0)
                        );
                      }, 0)
                    ) /
                    Number(
                      data?.variants?.reduce((total, variant) => {
                        return total + Number(variant?.reviews?.length);
                      }, 0)
                    )
                  }
                  disabled={true}
                />
                <p className="text-gray-500">
                  {Number(
                    data?.variants?.reduce((total, variant) => {
                      return (
                        total +
                        variant?.reviews?.reduce((total, review) => {
                          return total + Number(review?.rating);
                        }, 0)
                      );
                    }, 0)
                  ) /
                    Number(
                      data?.variants?.reduce((total, variant) => {
                        return total + Number(variant?.reviews?.length);
                      }, 0)
                    )}
                </p>
              </div>
            </div>

            <div className="flex w-full h-full relative overflow-y-auto grow-0 max-h-36">
              <div className="flex flex-col w-full divide-y h-fit">
                {data?.variants?.map((variant) => {
                  return variant?.reviews?.map((review) => {
                    return (
                      <RateItems data={review} key={"review-" + review?.id} />
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
