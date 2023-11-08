import { Form, Input, Button } from "antd";
import Image from "next/image";
import cat from "@/public/logo.png";
export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-full w-full px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4"></Image>
        <h1 className="font-bold text-lg text-center pt-2 pb-4">
          ĐẶT LẠI MẬT KHẨU
        </h1>
        <div className="flex flex-col w-full gap-2">
          <p className="m-0">Nhập mật khẩu mới</p>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
            className="m-0 w-full"
          >
            <Input.Password className="border"></Input.Password>
          </Form.Item>
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="m-0">Xác nhận mật khẩu mới</p>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
            className="m-0 w-full"
          >
            <Input.Password className="border"></Input.Password>
          </Form.Item>
        </div>
        <Form.Item className="w-full mt-2">
          <Button className="bg-primary/[.9] text-white font-bold rounded-md hover:bg-primary w-full">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </div>
    </div>
  );
}
