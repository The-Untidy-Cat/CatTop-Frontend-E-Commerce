import { Form, Input, Button } from "antd";
import Image from "next/image";
import cat from "@/public/logo.png";
import Link from "next/link";
export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-full w-full px-2 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo" />
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4">ĐĂNG NHẬP</h1>
        </div>
        <Form className="flex flex-col w-full gap-2">
          <p className="m-0">Tên đăng nhập</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
            className="m-0"
          >
            <Input placeholder="account"/>
          </Form.Item>
          <div className="flex justify-between">
            <p className="m-0">Mật khẩu</p>
            <Link href="/forgot-password" className="font-semibold">Quên mật khẩu?</Link>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
            className="m-0"
          >
            <Input.Password placeholder="account"/>
          </Form.Item>
          <Form.Item className="mt-2">
            <Button type="primary" className="w-full">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
