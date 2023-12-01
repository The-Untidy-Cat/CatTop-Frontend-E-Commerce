import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Cascader,
  Radio,
  Checkbox,
  Input,
  Select,
  Space,
  Button,
  Form,
} from "antd";
import { Modal } from "antd";
import { FiPlus } from "react-icons/fi";
import logo from "@/public/uit.png";
import { getAllAddress } from "@/services/address";

export default function Checkout() {
  const [form] = Form.useForm();
  const [fromData, setFormData] = useState(form.getFieldsValue());
  const [addressList, setAddressList] = useState([]);
  const handleChangeForm = (changedFields, allFields) => {
    setFormData(form.getFieldsValue());
    console.log(changedFields, allFields);
  };
  const getAddress = async () => {
    const response = await getAllAddress();
    setAddressList(response?.data?.address_books);
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
      <h1 className="text-lg font-semibold mb-2">Đặt hàng</h1>
      <Form
        form={form}
        className="flex flex-col md:flex-row w-full h-full gap-2"
        onFieldsChange={handleChangeForm}
        initialValues={{
          shipping_method: "store",
        }}
      >
        <div className="flex flex-col w-full h-full md:w-7/12 gap-2 bg-white rounded shrink-0 p-5">
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
            <Radio.Group>
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
                  className="h-fit w-full border min-h-12"
                  bordered={false}
                  size="small"
                  dropdownRender={(menu) => {
                    return (
                      <div className="flex flex-col gap-1 p-1">
                        <p className="m-0 font-medium text-sm">Đã lưu</p>
                        {menu}
                      </div>
                    );
                  }}
                  placeholder="Chọn địa chỉ giao hàng"
                >
                  {addressList?.map((item) => {
                    return (
                      <Select.Option value={item?.id}>
                        <div className="p-2">
                          <p className="m-0 font-medium">
                            {item?.name} | {item?.phone}
                          </p>
                          <p className="m-0 text-sm">{item?.address_line}</p>
                          <p className="m-0 text-sm">
                            {item?.ward}, {item?.district}, {item?.province}
                          </p>
                        </div>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </>
          )}
        </div>
        <div className="flex flex-col w-full h-full md:w-5/12 shrink-0"></div>
      </Form>
    </>
  );
}
