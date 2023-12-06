import { Button, Form, Image, InputNumber, Modal, Popover, Radio } from "antd";
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
import { LoginForm } from "../Login/login";
import { useRouter } from "next/router";


// export default function ProductDetail({ data }){
//   // const [currentVariant, setCurrentVariant] = useState(data?.variants?.[0]);
//   // data?.variants?.map((variant, index) =>
//   // console.log("xuất\n" + variant?.specifications?.battery

//   // + "\n"))
//   console.log("xuat "+data?.variants[0]?.specifications?.battery)

//   return (
//     <div>abc</div>
//   );
// }


export default function ProductDetail({ data }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { addItemToCart, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(data?.variants?.[0]);
  const increase = () => {
    const amount = form.getFieldValue("amount");
    if (amount < 10) form.setFieldsValue({ amount: amount + 1 });
  };
  const decrease = () => {
    const amount = form.getFieldValue("amount");
    if (amount > 1) form.setFieldsValue({ amount: amount - 1 });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
    console.log(value);
  };
  const addToCart = async () => {
    const value = form.getFieldsValue();
    await addItemToCart(value);
    return;
  };
  useEffect(() => { }, [data]);
  return (
    <div className="flex gap-5 md:gap-8 w-full h-fit grow-0 shrink-0">
      <div className="flex flex-col gap-2 w-full h-fit grow-0">
        <div className="flex bg-white rounded p-2 md:p-3 lg:p-4 gap-1">
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
        <div className="flex flex-col bg-white rounded gap-2 p-4">
          <div className="border-b py-4">
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Cấu hình đặc điểm</p>
              <a onClick={openModal}>Xem cấu hình chi tiết</a>
              <Modal
                centered
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                okText="Xác nhận"
                cancelText="Trở lại"
                okButtonProps={
                  {
                    className: 'bg-primary hover:bg-primary/[.8]'
                  }
                }
                className=" w-[600px]"
              >
                <p className="bg-white sticky top-0 font-semibold text-xl text-center pb-2">Cấu hình chi tiết</p>

                <div className="overflow-y-auto h-[500px]">
                  <div className="grid grid-cols-2 grid-rows-6 gap-4 ">
                    <div className="">
                      <p className="font-semibold">Bộ xử lý</p>
                      <p>a<br />b<br />b<br />b</p>
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
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold">Bộ xử lý</p>
                {/* <div className="grid grid-cols-2">
                  <p>Loại CPU</p>{currentVariant?.specifications?.cpu?.name === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.name}</p>)}
                  <p>Tốc độ</p>{currentVariant?.specifications?.cpu?.x === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.x} GHz</p>)}
                  <p>Bộ nhớ đệm</p>{currentVariant?.specifications?.cpu?.cache === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.cache} MB</p>)}
                </div> */}
              </div>
              <div>
                <p className="font-semibold">RAM</p>
                <div className="grid grid-cols-2">
                  <p>Dung lượng</p>{currentVariant?.specifications?.ram?.capacity === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.ram?.capacity / 1024} GB</p>)}
                  <p>Loại</p>{currentVariant?.specifications?.ram?.type === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.ram?.type}</p>)}
                  <p>Tần số</p>{currentVariant?.specifications?.ram?.frequency === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.ram?.frequency} MHz</p>)}
                </div>
              </div>
              <div>
                <p className="font-semibold">Màn hình</p>
                <div className="grid grid-cols-2">
                  <p>Độ phân giải</p>{currentVariant?.specifications?.display?.resolution === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.display?.resolution} px</p>)}
                  <p>Tần số làm mới</p>{currentVariant?.specifications?.display?.refresh_rate === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.display?.refresh_rate} Hz</p>)}
                  <p>Công nghệ</p>{currentVariant?.specifications?.display?.technology === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.display?.technology}</p>)}
                  <p>Cảm ứng</p>{currentVariant?.specifications?.display?.touch === true ? (<p>Có</p>) : (<p>Không</p>)}
                </div>
              </div>
              <div>
                <p className="font-semibold">Pin</p>
                <div className="grid grid-cols-2">
                  <p>Dung lượng pin</p>{currentVariant?.specifications?.battery === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.battery} mAh</p>)}
                </div>
              </div>
              <div>
                <p className="font-semibold">Card đồ họa</p>
                {/* <div className="grid grid-cols-2">
                  {currentVariant?.specifications?.gpu?.type === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.name}</p>)}
                </div> */}
              </div>
              <div>
                <p className="font-semibold">Ổ cứng</p>
                {/* <div className="grid grid-cols-2">
                  {currentVariant?.specifications?.storage?.drive === undefined ? null: (<p>Dung lượng {currentVariant?.specifications?.storage?.drive</p><p>{currentVariant?.specifications?.storage?.capacity} GB</p>)}
                </div> */}
              </div>
              <div>
                <p className="font-semibold">Khối lượng và Kích thước</p>
                {/* <div className="grid grid-cols-2">
                  <p>Khối lượng</p>{currentVariant?.specifications?.cpu?.name === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.name}</p>)}
                  <p>Kích thước</p>{currentVariant?.specifications?.cpu?.x === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.x} GHz</p>)}
                  <p>Chất liệu vỏ</p>{currentVariant?.specifications?.cpu?.x === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.x} GHz</p>)}
                </div> */}
              </div>
              <div>
                <p className="font-semibold">Webcam và Âm thanh</p>
                {/* <div className="grid grid-cols-2">
                  <p>Webcam</p>{currentVariant?.specifications?.cpu?.name === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.name}</p>)}
                  <p>Công nghệ âm thanh</p>{currentVariant?.specifications?.cpu?.x === undefined ? (<p>&nbsp;</p>) : (<p>{currentVariant?.specifications?.cpu?.x} GHz</p>)}
                </div> */}
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
                {user ? (
                  <Button
                    type="text"
                    className="flex items-center gap-1 font-semibold text-primary"
                    icon={<FaCartPlus />}
                    onClick={() => addToCart()}
                  >
                    Thêm vào giỏ
                  </Button>
                ) : (
                  <Popover
                    content={<LoginForm onSuccess={addToCart} />}
                    title="Đăng nhập để thêm vào giỏ hàng"
                    trigger={"click"}
                  >
                    <Button
                      type="text"
                      className="flex items-center gap-1 font-semibold text-primary"
                      icon={<FaCartPlus />}
                    >
                      Thêm vào giỏ
                    </Button>
                  </Popover>
                )}
                {user ? (
                  <Button

                    htmlType="submit"
                    className="flex items-center gap-1 bg-primary text-white"
                  >
                    Mua ngay
                  </Button>
                ) : (
                  <Popover
                    content={<LoginForm />}
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
            </div>
          </Form>
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
