import { Form, Input, Button, Space, notification } from "antd";
import Image from "next/image";
import cat from "@/public/logo.png";
import { useEffect, useState } from "react";
import { InputOTP } from "antd-input-otp";
import moment from "moment/moment";
import { motion } from "framer-motion";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [remainingTime, setRemainingTime] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  const [checkEmailForm] = Form.useForm();
  const [checkOTPForm] = Form.useForm();
  const [resetPasswordForm] = Form.useForm();
  const sendOTP = async () => {
    try {
      if (remainingTime > 0) {
        notification.error({
          message: "Lỗi",
          description: "Vui lòng đợi 5 phút để gửi lại mã OTP",
        });
        return;
      }

      // const response = await api.post(`/web/auth/forgot-password`, {
      //     email,
      // });
      // if (response.status === 200) {
      //     setIsRequested(true);
      // }
      setRemainingTime(10);
      notification.success({
        message: "Thành công",
        description: "Gửi mã OTP thành công. Vui lòng kiểm tra hộp thư",
      });
      checkOTPForm.setFieldValue("code", null);
    } catch (e) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  const handleRequestOTP = async (values) => {
    const { email } = values;
    setEmail(email);
    try {
      await sendOTP();
      //   const response = await api.post(`/web/auth/forgot-password`, {
      //     email,
      //   });
      //   if (response.status === 200) {
      //     setIsRequested(true);
      //   }
      setStep(2);
    } catch (error) {
      checkEmailForm.setFields([
        {
          name: "email",
          errors: ["Email không tồn tại"],
        },
      ]);
    }
  };

  const handleCheckOTP = async (values) => {
    const { code } = values;
    console.log(code);
    try {
      // await sendOTP();
      //   const response = await api.post(`/web/auth/forgot-password`, {
      //     email,
      //   });
      //   if (response.status === 200) {
      //     setIsRequested(true);
      //   }
      setStep(3);
    } catch (error) {
      checkOTPForm.setFields([
        {
          name: "code",
          errors: ["Mã OTP không đúng"],
        },
      ]);
    }
  };
  const handleChangeEmail = () => {
    setCode(null);
    setRemainingTime(0);
    setStep(1);
  };
  useEffect(() => {
    if (remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    }
  }, [remainingTime]);
  return (
    <div className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-full w-full px-2 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo"></Image>
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4">
            ĐẶT LẠI MẬT KHẨU
          </h1>
        </div>
        {step == 1 && (
          <motion.div
            initial={{ x: email ? -10 : 10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form
              className="flex flex-col w-full gap-2"
              onFinish={handleRequestOTP}
              form={checkEmailForm}
            >
              <Form.ErrorList />
              <p className="m-0">Nhập email đã đăng ký</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email hợp lệ",
                    type: "email",
                  },
                ]}
                className="m-0 w-full"
              >
                <Input className="w-full" placeholder="example@domain.com" />
              </Form.Item>
              <Form.Item className="w-full">
                <Button htmlType="submit" className="w-full" type="primary">
                  Gửi OTP
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        )}
        {step == 2 && (
          <motion.div
            initial={{ x: -10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form className="flex flex-col w-full gap-2" form={checkOTPForm} onFinish={handleCheckOTP}>
              <p className="m-0">
                Nhập mã OTP gửi đến{" "}
                <span className="font-semibold">{email}</span>
              </p>
              <Form.Item
                label=""
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã xác thực",
                  },
                ]}
                className="m-0 w-full"
              >
                <InputOTP
                  inputType="numeric"
                  autoSubmit={checkOTPForm}
                  inputClassName="focus:border-primary hover:border-primary"
                />
              </Form.Item>
              {remainingTime > 0 ? (
                <p className="m-0">
                  Mã OTP sẽ hết hạn sau
                  <span className="ml-1 font-semibold text-primary">
                    {moment.utc(1000 * remainingTime).format("mm:ss")}
                  </span>
                </p>
              ) : (
                <Button
                  type="link"
                  onClick={() => sendOTP()}
                  className="font-semibold"
                >
                  Gửi lại mã OTP
                </Button>
              )}
              <div className="flex flex-col gap-2 w-full">
                <Form.Item className="m-0">
                  <Button type="primary" htmlType="submit" className="w-full">
                    Xác thực
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="w-full"
                    onClick={() => handleChangeEmail()}
                  >
                    Thay đổi email
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </motion.div>
        )}
        {step == 3 && (
          <motion.div
            initial={{ x: -10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form
              className="flex flex-col w-full gap-2"
              form={resetPasswordForm}
            >
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
            </Form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
