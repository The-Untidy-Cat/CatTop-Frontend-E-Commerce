import React from "react";
import { Form, Input, Button } from "antd";
import Image from "next/image";
import cat from "@/public/logo.png";
import { useAuth } from "../Provider/AuthProvider";
import Link from "next/link";

function RegistrationForm() {
  const { register, loadingAuth } = useAuth();
  const [form] = Form.useForm();
  const handleSubmmit = async (values) => {
    register(values).then((res) => {}).catch((err) => {
      err?.map((e) => {
        form.setFields([
          {
            name: Object.keys(e),
            errors: e[Object.keys(e)],
          },
        ]);
      });
    });
  };

  return (
    <main className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-fit min-h-full w-full px-2 py-2 py-5 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit min-h-full rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo" />
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4 uppercase">
            Tạo tài khoản
          </h1>
        </div>
        <Form
          name="registration"
          onFinish={handleSubmmit}
          autoComplete="off"
          form={form}
          className="flex flex-col w-full gap-2"
        >
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-col gap-2 w-1/3">
              <p className="m-0">Họ</p>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
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
                    pattern: /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                    message: "Không hợp lệ",
                  },
                ]}
                className="m-0"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <p className="m-0">Email</p>
          <Form.Item
            label=""
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
            <Input />
          </Form.Item>
          <p className="m-0">Số điện thoại</p>
          <Form.Item
            label=""
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
            <Input />
          </Form.Item>
          <p className="m-0">Tên đăng nhập</p>
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9.\S]+$/,
                message: "Chỉ nhập chữ, số và dấu chấm!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
          <p className="m-0">Mật khẩu</p>
          <Form.Item
            label=""
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập Mật khẩu!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ]}
            className="m-0"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="m-0 mt-2">
            <Button type="primary" className="w-full" htmlType="submit" loading={loadingAuth}>
              Đăng ký
            </Button>
          </Form.Item>
          <Link className="w-full text-center font-medium mb-2" href="/login">
            Đã có tài khoản? Đăng nhập
          </Link>
        </Form>
      </div>
    </main>
  );
}

export default RegistrationForm;