import { useState } from "react";
import { Radio, Input, Select, Button, Form, Modal } from "antd";
import { getAllAddress } from "@/services/address";
import { formatCurrency } from "@/utils/currency";
import { CartItem } from "../Cart/item";
import { PROVINCES } from "@/app.config";
import { ModalToggle } from "../Modal";
import { NewAddressForm } from "../Form/Address";
import { checkOut } from "@/services/order";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../Provider/AuthProvider";

export default function Checkout({ cart, type }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { refreshCart, setLoadingUser } = useUser();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [fromData, setFormData] = useState(form.getFieldsValue());
  const [addressList, setAddressList] = useState([]);

  const handleChangeForm = (changedFields, allFields) => {
    setFormData(form.getFieldsValue());
  };

  const getAddress = async () => {
    const response = await getAllAddress();
    setAddressList(response?.data?.address_books);
  };

  const handleFinish = (values) => {
    setLoadingCheckout(true);
    setLoadingUser(true)
    checkOut({ data: { ...values, cart }, type })
      .then((response) => {
        refreshCart();
        router.push(`/user/orders/${response?.data?.detail?.id}`).then(() => {
          setLoadingCheckout(false);
          setLoadingUser(false);
        });
      })
      .catch((error) => {
        Modal.error({
          title: "Đặt hàng thất bại",
          content: (
            <div className="flex flex-col justify-center">
              <p className="m-0">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Vui lòng thử lại sau"}
              </p>
              <Link href="/cart">
                <Button className="bg-primary text-white">
                  Quay lại giỏ hàng
                </Button>
              </Link>
            </div>
          ),
          centered: true,
          onCancel: null,
          onOk: null,
          cancelButtonProps: { hidden: true },
          okButtonProps: { hidden: true },
        });
        setLoadingCheckout(false);
        setLoadingUser(false)
      })
  };

  return (
    <>
      <h1 className="text-lg font-semibold mb-2">Đặt hàng</h1>
      <Form
        form={form}
        className="grid grid-cols-1 md:grid-cols-12 w-full h-full gap-2"
        onFieldsChange={handleChangeForm}
        initialValues={{
          shipping_method: "store",
          payment_method: "cash",
        }}
        onFinish={handleFinish}
        disabled={loadingCheckout}
      >
        <div className="flex flex-col w-full h-full md:col-span-7 gap-2 bg-white rounded p-5">
          <p className="font-semibold text-lg">Thông tin đơn hàng</p>
          <p className="m-0 font-medium">Phương thức thanh toán</p>
          <Form.Item
            name="payment_method"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
          >
            <Radio.Group className="flex flex-col md:flex-row gap-1">
              <Radio value="cash">Thanh toán khi nhận hàng</Radio>
              <Radio value="banking">Chuyển khoản ngân hàng</Radio>
            </Radio.Group>
          </Form.Item>
          <p className="m-0 font-medium">Phương thức nhận hàng</p>
          <Form.Item
            name="shipping_method"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức nhận hàng",
              },
            ]}
          >
            <Radio.Group className="flex flex-col md:flex-row gap-1">
              <Radio value="store">Nhận tại cửa hàng</Radio>
              <Radio value="shipping">Giao hàng tận nơi</Radio>
            </Radio.Group>
          </Form.Item>
          {fromData?.shipping_method === "shipping" && (
            <>
              <p className="m-0 font-medium">Địa chỉ giao hàng</p>
              <Form.Item
                name="address_id"
                className="m-0"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn địa chỉ giao hàng",
                  },
                ]}
              >
                <Select
                  popupClassName="z-0"
                  className="h-fit w-full border rounded p-0.5"
                  bordered={false}
                  size="small"
                  dropdownRender={(menu) => {
                    return (
                      <div className="px-2">
                        <div className="flex justify-between items-center gap-1.5">
                          <p className="m-0 font-medium text-sm">Đã lưu</p>
                          <ModalToggle
                            modal={{
                              title: "Thêm địa chỉ",
                            }}
                            button={{
                              label: "Thêm mới",
                              type: "link",
                              className: "p-0 m-0 font-medium text-sm",
                            }}
                          >
                            <NewAddressForm onSuccess={getAddress} />
                          </ModalToggle>
                        </div>
                        <div className="flex flex-col gap-1 pb-2">{menu}</div>
                      </div>
                    );
                  }}
                  placeholder={
                    <p className="m-0 text-sm text-gray-500 py-6">
                      Chọn địa chỉ giao hàng
                    </p>
                  }
                  onFocus={getAddress}
                >
                  {addressList?.map((item) => {
                    return (
                      <Select.Option value={item?.id} key={item?.id}>
                        <div className="w-full break-all">
                          <p className="m-0 sm">
                            <span className="font-medium">{item?.name}</span> |{" "}
                            {item?.phone}
                          </p>
                          <p className="m-0 text-xs break-all">
                            {item?.address_line}
                          </p>
                          <p className="m-0 text-xs break-all">
                            {
                              PROVINCES?.find(
                                (province) => province?.code === item?.province
                              )
                                ?.districts?.find(
                                  (district) => district?.code == item?.district
                                )
                                ?.wards?.find(
                                  (ward) => ward?.code == item?.ward
                                )?.name
                            }
                            <br />
                            {
                              PROVINCES?.find(
                                (province) => province?.code === item?.province
                              )?.districts?.find(
                                (district) => district?.code == item?.district
                              )?.name
                            }
                            <br />
                            {
                              PROVINCES?.find(
                                (province) => province.code === item?.province
                              )?.name
                            }
                          </p>
                        </div>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </>
          )}
          <p className="m-0 font-medium">Ghi chú đơn hàng</p>
          <Form.Item name="note" className="m-0 h-full">
            <Input.TextArea placeholder="Ghi chú đơn hàng" className="h-full" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-full h-full md:col-span-5 ">
          <div className="flex flex-col rounded p-5 gap-2 w-full bg-white">
            <p className="font-semibold text-lg">Đơn hàng của bạn</p>
            {cart?.map((item, index) => (
              <CartItem item={item} editable={false} key={index} />
            ))}
          </div>
          <div className="flex flex-col rounded p-5 gap-2 w-full bg-white">
            <p className="font-semibold text-lg">Tóm tắt đơn hàng</p>
            <p className="flex justify-between gap-1 m-0">
              Giảm giá:
              <span className="font-semibold">
                {formatCurrency(
                  cart.length > 0
                    ? cart
                        ?.map((item) =>
                          item?.variant?.state == "published"
                            ? item?.variant?.discount *
                              item?.amount *
                              item?.variant?.standard_price
                            : 0
                        )
                        ?.reduce((total, item) => {
                          return total + item;
                        })
                    : 0
                )}
                đ
              </span>
            </p>
            <p className="flex justify-between gap-1 m-0">
              Phí vận chuyển:
              <span className="font-semibold">Miễn phí</span>
            </p>

            <div className="border-t border-dashed"></div>
            <p className="flex justify-between gap-1 m-0">
              Tổng tiền:
              <span className="text-lg font-semibold text-red-500">
                {formatCurrency(
                  cart.length > 0
                    ? cart
                        ?.map((item) =>
                          item?.variant?.state == "published"
                            ? item?.amount * item?.variant?.sale_price
                            : 0
                        )
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
            <Form.Item className="m-0">
              <Button
                className="bg-primary text-white w-full"
                hidden={!cart.length}
                htmlType="submit"
              >
                Xác nhận đặt hàng
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}
