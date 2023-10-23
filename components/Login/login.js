import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import cat from '@/public/logo.png';
export default function Login() {
    return (
        <main className='bg-secondary/[.4]'>
            <div class="flex flex-wrap flex-col items-center justify-center h-screen">
                
                <div className="flex flex-col items-center bg-white w-1/3 h-[380px] rounded-2xl">
                <Image src={cat} className='w-14 mt-4'></Image> 
                    <div><h1 className='font-bold text-lg text-center pt-2 pb-4'>ĐĂNG NHẬP</h1></div>
                    <div className='w-[350px] mt-2'>
                        <p className='mb-2'>Email/Số điện thoại</p>
                        <Form.Item
                            label=""
                            name="fullname"
                            rules={[{
                                required: true,
                                message: "Vui lòng nhập email/số điện thoại"
                            }]}
                            className='w-full'
                        >
                            <Input className='w-full border'></Input>
                        </Form.Item>
                    </div>
                    <div className='w-[350px]'>
                        <p className='float-left'>Mật khẩu</p><p className='float-right text-primary font-semibold'>Quên mật khẩu?</p>
                        <br></br>
                        <Form.Item
                            label=""
                            name="password"
                            rules={[{
                                required: true,
                                message: ""
                            }]}
                            className='w-full'
                        >
                            <Input className='w-full border mt-2'></Input>
                        </Form.Item>
                    </div>
                    <div className='mt-2'>
                        <Form.Item>
                            <Button className='bg-primary/[.9] text-white font-bold px-4 h-9 rounded-md hover:bg-primary'>Đăng nhập</Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </main>
    )
}