import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import cat from '@/public/logo.png';
export default function ForgetPassword() {
    return (
        <main className='bg-secondary/[.4]'>
            <div class="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center bg-white w-[450px] h-[480px] rounded-2xl">
                    <Image src={cat} className='w-14 mt-4'></Image>
                    <div><h1 className='font-bold text-lg text-center pt-2 pb-4'>ĐẶT LẠI MẬT KHẨU</h1></div>
                    <div className='w-10/12 mt-2'>
                        <p className='mb-2'>Nhập email đã đăng ký</p>
                        <Form.Item
                            label=""
                            name="email"
                            rules={[{
                                required: true,
                                message: "Vui lòng nhập email"
                            }]}
                            className=''
                        >
                            <Input className='border'></Input>
                        </Form.Item>
                    </div>
                    <div className='mt-1'>
                        <Form.Item>
                            <Button className='bg-primary/[.9] text-white font-bold h-9 rounded-md hover:bg-primary'>Gửi email đặt lại mật khẩu</Button>
                        </Form.Item>
                    </div>
                    <div className='w-10/12 mt-1'>
                        <p className='mb-2'>Nhập mã xác thực</p>
                        <Form.Item
                            label=""
                            name="code"
                            rules={[{
                                required: true,
                                message: "Vui lòng nhập mã xác thực"
                            }]}
                            className=''
                        >
                            <Input className='border'></Input>
                        </Form.Item>
                    </div>
                    <div className='mt-1'>
                        <Form.Item>
                            <Button className='bg-primary/[.9] text-white font-bold h-9 rounded-md hover:bg-primary'>Xác thực</Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </main>
    )
}