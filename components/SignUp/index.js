import React from 'react';
import { Form, Input, Button } from 'antd';
import Image from "next/image";
import logo from "@/public/logo.png"

function RegistrationForm() {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  // const confirmPassword = ({ getFieldValue }) => ({
  //   validator(rule, value) {
  //     if (!value || getFieldValue('password') === value) {
  //       return Promise.resolve();
  //     }

  //     return Promise.reject('Mật khẩu không khớp!');
  //   },
  // });

  return (
    <div className='flex flex-col items-center align-center justify-center h-screen bg-secondary/[.3]' >
      <div className='flex flex-col items-center gap-1 align bg-white w-full sm:w-[500px] lg:w-[700px] rounded-2xl p-[15px]'>
        <div className='flex flex-col items-center ' >
          <Image src={logo} alt='logo' className="logo w-14" />
          {/* <p className='text-xl font-semibold text-primary font-sans'>Cửa hàng Mỹ Diệu</p> */}
          <p className='text-2xl font-semibold text-primary font-sans'>Đăng ký</p>
        </div>

        <Form
          name="registration"
          onFinish={onFinish}
          autoComplete="off"
          className='flex flex-col items-center w-1/2'
        >
          <div className='w-full flex gap-8'>
            <div>
              <p>Họ</p>
              <Form.Item
                label=""
                name="last_name"
                rules={[{ required: true, pattern: /^[^\d`~!@#$%^&*()+_=|\\{}[\]:;"'<>,.?/]+$/,message: 'Không hợp lệ!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <p>Tên</p>
                <Form.Item
                  label=""
                  name="first_name"
                  rules={[{ required: true, pattern: /^[^\d`~!@#$%^&*()+_=|\\{}[\]:;"'<>,.?/]+$/, message: 'Không hợp lệ!' }]}

                >
                  <Input />
                </Form.Item>
            </div>
          </div>

          <div className='w-full' >
            <p>Email</p>
            <Form.Item
              label=""
              name="email"
              rules={[
                { required: true,  type: 'email', message: 'Email không hợp lệ!'},
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className='w-full' >
            <p>Số điện thoại</p>
            <Form.Item
              label=""
              name="phone_number"
              rules={[
                { required: true, pattern: /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className='w-full'>
              <p>Tên người dùng</p>
                <Form.Item
                  label=""
                  name="username"
                  rules={[{ required: true, pattern: /^[a-zA-Z0-9\s]+$/, message: 'Chỉ nhập chữ và số!' }]}
                >
                  <Input />
                </Form.Item>
          </div>

          <div className='w-full'>
            <p>Mật khẩu</p>
            <Form.Item
              label=""
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          {/* <div className='w-full'>
            <p>Nhập lại mật khẩu</p>
            <Form.Item
              label=""
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng nhập lại Mật khẩu!' },
                confirmPassword,
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div> */}

          <Form.Item className='w-1/4 text-center'>
            <Button className='bg-primary text-white font-semibold' htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
}

export default RegistrationForm;
