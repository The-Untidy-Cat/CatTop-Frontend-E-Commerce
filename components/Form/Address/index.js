import { PROVINCES } from "@/app.config";
import { addNewAddress, editAddress } from "@/services/address";
import { Button, Form, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";

const NewAddressForm = ({ onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      addNewAddress(values)
        .then((response) => {
          onSuccess && onSuccess();
          onClose && onClose();
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      form={form}
      className="flex flex-col w-full gap-2"
      onFinish={handleSubmit}
      disabled={loading}
    >
      <p>Tên người nhận</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập tên người nhận" />
      </Form.Item>
      <p>Số điện thoại</p>
      <Form.Item
        name="phone"
        rules={[
          {
            pattern:
              /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập số điện thoại" />
      </Form.Item>
      <p>Tỉnh/Thành phố</p>
      <Form.Item
        name="province"
        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Tỉnh/Thành phố"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={PROVINCES?.map((province) => ({
            value: province.code,
            label: province.name,
          }))}
          onChange={(value) => {
            setSelectedProvince(value);
            setSelectedDistrict(null);
            setSelectedWard(null);
            form.setFieldsValue({ district: null, ward: null });
          }}
        />
      </Form.Item>
      <p>Quận/Huyện</p>
      <Form.Item
        name="district"
        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Quận/Huyện"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            selectedProvince
              ? PROVINCES?.find(
                  (province) => province.code === selectedProvince
                )?.districts?.map((district) => ({
                  value: district.code,
                  label: district.name,
                }))
              : []
          }
          onChange={(value) => {
            setSelectedDistrict(value);
            setSelectedWard(null);
            form.setFieldsValue({ ward: null });
          }}
        />
      </Form.Item>
      <p>Phường/Xã</p>
      <Form.Item
        name="ward"
        rules={[{ required: true, message: "Vui lòng chọn Phường/Xã" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Phường/Xã"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            selectedDistrict
              ? PROVINCES?.find(
                  (province) => province.code === selectedProvince
                )
                  ?.districts?.find(
                    (district) => district.code === selectedDistrict
                  )
                  ?.wards?.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                  }))
              : []
          }
        />
      </Form.Item>
      <p>Địa chỉ cụ thể</p>
      <Form.Item
        name="address_line"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập địa chỉ cụ thể" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          htmlType="submit"
          className="bg-primary text-white w-full"
          loading={loading}
        >
          Thêm mới
        </Button>
      </Form.Item>
    </Form>
  );
};

const EditAddressForm = ({ data, onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      editAddress(data?.id, values)
        .then((response) => {
          onSuccess && onSuccess();
          onClose && onClose();
        })
        .catch((error) => {
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra, vui lòng thử lại sau!",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại sau!",
      });
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        phone: data?.phone,
        province: data?.province,
        district: data?.district,
        ward: data?.ward,
        address_line: data?.address_line,
      });
      setSelectedProvince(data?.province);
      setSelectedDistrict(data?.district);
      setSelectedWard(data?.ward);
    }
  }, [data]);
  return (
    <Form
      form={form}
      className="flex flex-col w-full gap-2"
      onFinish={handleSubmit}
      disabled={loading}
    >
      <p>Tên người nhận</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập tên người nhận" />
      </Form.Item>
      <p>Số điện thoại</p>
      <Form.Item
        name="phone"
        rules={[
          {
            pattern:
              /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập số điện thoại" />
      </Form.Item>
      <p>Tỉnh/Thành phố</p>
      <Form.Item
        name="province"
        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Tỉnh/Thành phố"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={PROVINCES?.map((province) => ({
            value: province.code,
            label: province.name,
          }))}
          onChange={(value) => {
            setSelectedProvince(value);
            setSelectedDistrict(null);
            setSelectedWard(null);
            form.setFieldsValue({ district: null, ward: null });
          }}
        />
      </Form.Item>
      <p>Quận/Huyện</p>
      <Form.Item
        name="district"
        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Quận/Huyện"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            selectedProvince
              ? PROVINCES?.find(
                  (province) => province.code === selectedProvince
                )?.districts?.map((district) => ({
                  value: district.code,
                  label: district.name,
                }))
              : []
          }
          onChange={(value) => {
            setSelectedDistrict(value);
            setSelectedWard(null);
            form.setFieldsValue({ ward: null });
          }}
        />
      </Form.Item>
      <p>Phường/Xã</p>
      <Form.Item
        name="ward"
        rules={[{ required: true, message: "Vui lòng chọn Phường/Xã" }]}
        className="m-0"
      >
        <Select
          placeholder="Chọn Phường/Xã"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            selectedDistrict
              ? PROVINCES?.find(
                  (province) => province.code === selectedProvince
                )
                  ?.districts?.find(
                    (district) => district.code === selectedDistrict
                  )
                  ?.wards?.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                  }))
              : []
          }
        />
      </Form.Item>
      <p>Địa chỉ cụ thể</p>
      <Form.Item
        name="address_line"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        className="m-0"
      >
        <Input type="text" placeholder="Nhập địa chỉ cụ thể" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          htmlType="submit"
          className="bg-primary text-white w-full"
          loading={loading}
        >
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export { NewAddressForm, EditAddressForm };
