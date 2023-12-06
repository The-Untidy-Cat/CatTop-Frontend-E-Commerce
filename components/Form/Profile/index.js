import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Radio, notification } from "antd";
import moment from "moment";
import { useUser } from "../../Provider/AuthProvider";

export const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const { changePassword } = useUser();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    changePassword(values)
      .then(() => {
        notification.success({
          message: "Thành công",
          description: "Đổi mật khẩu thành công",
        });
      })
      .catch((e) => {
        if (typeof e === "string") {
          notification.error({
            message: "Đổi mật khẩu thất bại",
            description: e,
          });
        } else {
          Object.keys(e).forEach((key) => {
            form.setFields([
              {
                name: key,
                errors: [e[key]],
              },
            ]);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form
      form={form}
      autoComplete="off"
      className="flex flex-col gap-2"
      onFinish={handleSubmit}
    >
      <p className="m-0">Mật khẩu mới</p>
      <Form.Item
        name="new_password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới!",
          },
        ]}
        className="m-0"
      >
        <Input.Password className="w-full" />
      </Form.Item>

      <p className="m-0">Xác nhận mật khẩu</p>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Xác nhận mật khẩu không khớp!"));
            },
          }),
        ]}
        className="m-0"
      >
        <Input.Password className="w-full" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button className="bg-primary w-full text-white" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function UpdateProfileForm() {
  const [form] = Form.useForm();
  const { user, updateProfile } = useUser();
  const handleSubmit = (values) => {
    updateProfile({
      ...values,
      email: values?.email !== user?.email ? values?.email : undefined,
      date_of_birth: values?.date_of_birth?.format("YYYY-MM-DD") || undefined,
    })
      .then(() => {
        notification.success({
          message: "Thành công",
          description: "Cập nhật thành công",
        });
      })
      .catch((e) => {
        if (typeof e === "string") {
          notification.error({
            message: "Cập nhật thất bại",
            description: e,
          });
        } else {
          Object.keys(e).forEach((key) => {
            form.setFields([
              {
                name: key,
                errors: [e[key]],
              },
            ]);
          });
        }
      });
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      className="flex flex-col gap-2"
      initialValues={{
        first_name: user?.first_name,
        last_name: user?.last_name,
        user_name: user?.username,
        email: user?.email,
        phone_number: user?.phone_number,
        gender: user?.gender,
        date_of_birth: user?.date_of_birth && moment(user?.date_of_birth),
      }}
      onFinish={handleSubmit}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Họ</p>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <p className="m-0">Tên</p>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                pattern:
                  /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <p className="m-0">Tên đăng nhập</p>
      <Form.Item
        name="user_name"
        rules={[
          {
            required: true,
            pattern: /^[^\d`~!@#$%^&*()+_=|\\{}[\]:;"'<>,.?/]+$/,
            message: "Không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" disabled />
      </Form.Item>

      <p className="m-0">Email</p>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Email không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" />
      </Form.Item>

      <p className="m-0">Số điện thoại</p>
      <Form.Item
        name="phone_number"
        rules={[
          {
            required: true,
            pattern:
              /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" />
      </Form.Item>

      <p className="m-0">Giới tính</p>
      <Form.Item
        name="gender"
        className="m-0"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn giới tính!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={0}>Nam</Radio>
          <Radio value={1}>Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      <p className="m-0">Ngày sinh </p>
      <Form.Item name="date_of_birth" className="m-0">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item className="m-0 mt-2">
        <Button className="bg-primary w-full text-white" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
