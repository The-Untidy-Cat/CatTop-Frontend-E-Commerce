import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Dropdown, DatePicker, Menu, Layout, Radio, Modal, Space, Checkbox, Select } from 'antd';
import Image from "next/image";
import logo from "@/public/logo.png"
import moment from 'moment';
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TfiMapAlt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import {
    UserOutlined,
    FileTextOutlined,
    BellOutlined,
    DownOutlined
} from '@ant-design/icons';
import { LuTicket } from "react-icons/lu";
import { IoSearch } from 'react-icons/io5';
import { TbMoodEmpty } from 'react-icons/tb';
import axios from 'axios';


export default function Profile() {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;

    const [valueMenu, setValueMenu] = useState();
    const handleMenu = (e) => {
        setValueMenu(e.key);
    }
    const info = [
        {
            name: 'theuntidycat',
            email: 'cattop@gmail.com',
            phone: '0123456789',
            gender: 'female',
            bday: '01/01/2023'
        }
    ];
    // const handleMenu = (e) => {
    //     console.log(e.key);
    //     console.log("đây là đơn mua");
    // }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
    const getItem = (label, key, icon, subItems) => {
        if (subItems) {
            return (
                <Menu.SubMenu
                    key={key}
                    icon={icon}
                    title={label}
                    className='text-primary text-base'
                    onClick={handleMenu}
                >
                    {subItems.map(subItem => (
                        <Menu.Item key={subItem.key} className='hover:font-semibold'>
                            {subItem.label}
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            );
        } else {
            return (
                <Menu.Item
                    key={key}
                    icon={icon}
                    className={`text-primary hover:font-semibold text-base ${label === 'Đơn mua' || label === 'Thông báo' || label === 'Kho Voucher' ? 'pl-6' : 'pl-0'}`}
                    onClick={handleMenu}
                >
                    {label}
                </Menu.Item>
            );
        }
    };

    const items1 = [
        getItem('Tài khoản của tôi', '1', <UserOutlined />,
            [
                { label: 'Hồ sơ', key: 'sub1' },
                { label: 'Địa chỉ', key: 'sub2' },
                { label: 'Đổi mật khẩu', key: 'sub3' },
            ]
        ),
        getItem('Đơn mua', '2', <FileTextOutlined />,),
        // getItem('Thông báo', '3', <BellOutlined />,),
        // getItem('Kho Voucher', '4', <LuTicket />,),
    ];

    const itemsTinh = [
        {
            label: 'Tỉnh A',
            value: 'Tỉnh A',
        },
        {
            label: 'Tỉnh B',
            value: 'Tỉnh B',
        }
    ];
    const itemsHuyen = [
        {
            label: 'Huyện A',
            value: 'Huyện A',
        },
        {
            label: 'Huyện B',
            value: 'Huyện B',
        }
    ];
    const itemsXa = [
        {
            label: 'Xã A',
            value: 'Xã A',
        },
        {
            label: 'Xã B',
            value: 'Xã B',
        }
    ];
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className="bg-secondary/[.4] h-full w-full py-5">
            <Layout className='bg-secondary/[.0] px-10'>
                <Sider className='bg-secondary/[.0] pt-4'>
                    <p className='flex flex-col items-center'>
                        <Image src={logo} className="w-10" alt="logo"></Image>
                        <span className='font-semibold text-base my-2'>{info[0].name}</span>
                        <span className='text-primary/[.6]'><a href='#'><FaRegEdit /> Sửa hồ sơ</a></span>
                    </p>
                    <Menu
                        theme=""
                        mode="inline"
                        style={{ width: '230px' }}
                        defaultSelectedKeys={['sub1']}
                    >
                        {items1.map(item => (
                            <React.Fragment key={item.key} onClick={handleMenu}>
                                {item}
                            </React.Fragment>
                        ))}
                    </Menu>

                </Sider>

                {/* Hồ sơ */}
                {valueMenu === 'sub1' ? (
                    <Content className='bg-white ml-12 pl-7 pt-4 w-1/2' style={{ background: 'white', padding: '10px', Width: '100px' }}>
                        <div className='mb-3' >
                            <p className='text-xl font-semibold text-primary font-sans'>Hồ Sơ Của Tôi</p>
                            <p className='pb-4'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            <hr />
                        </div>
                        <div className='flex'>
                            <div className='w-6/12'>
                                <Form
                                    name="registration"
                                    autoComplete="off"
                                    className=''
                                    initialValues={{
                                        user_name: info[0].name,
                                        email: info[0].email,
                                        phone_number: info[0].phone,
                                    }}
                                >
                                    <p>Tên người dùng</p>
                                    <Form.Item
                                        label=""
                                        name="user_name"
                                        rules={[{ required: true, pattern: /^[^\d`~!@#$%^&*()+_=|\\{}[\]:;"'<>,.?/]+$/, message: 'Không hợp lệ!' }]}
                                        className='mt-2'
                                    >
                                        <Input className='w-full' />
                                    </Form.Item>


                                    <p>Email</p>
                                    <Form.Item
                                        label=""
                                        name="email"
                                        rules={[
                                            { required: true, type: 'email', message: 'Email không hợp lệ!' },
                                        ]}
                                        className='mt-2'
                                    >
                                        <Input className='w-full' />
                                    </Form.Item>

                                    <p>Số điện thoại</p>
                                    <Form.Item
                                        label=""
                                        name="phone_number"
                                        rules={[
                                            { required: true, pattern: /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/, message: 'Số điện thoại không hợp lệ!' },
                                        ]}
                                        className='mt-2'
                                    >
                                        <Input className='w-full' />
                                    </Form.Item>

                                    <p>Giới tính</p>
                                    <Form.Item
                                        label=""
                                        name="gender"
                                        className='mt-2'
                                    >
                                        <Radio.Group defaultValue={info[0].gender}>
                                            <Radio value="male">Nam</Radio>
                                            <Radio value="female">Nữ</Radio>
                                            <Radio value="other">Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <p>Ngày sinh </p>
                                    <Form.Item
                                        label=""
                                        name="bday"
                                        className='mt-2'
                                    >
                                        <DatePicker defaultValue={moment(info[0].bday)} className='w-full' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button className='bg-primary w-full text-white font-semibold' htmlType="submit">
                                            Lưu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className='flex flex-col items-center justify-center w-6/12 mb-12'>
                                <Image src={logo} className="w-28" alt="logo"></Image>
                                <p className='font-bold text-xl'>CATTOP</p>
                            </div>
                        </div>
                    </Content>
                ) : null}

                {/* Địa chỉ */}
                {valueMenu === 'sub2' ? (
                    <Content className='flex flex-col bg-white ml-12 pl-7 h-[590px] w-1/2' style={{ background: 'white', padding: '10px' }}>
                        <div>
                            <p className='text-lg py-1 float-left mt-2'>Địa chỉ của tôi</p>
                            <span className='float-right'>
                                <Button className='px-4 h-10 bg-primary/[.4] hover:bg-primary/[.5] hover:text-white border-0 mr-4 mt-2' onClick={showModal}><FaPlus className='mr-2' />Thêm địa chỉ mới</Button>
                                <Modal
                                    open={isModalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    cancelText="Trở lại"
                                    okText="Xác nhận"
                                    cancelButtonProps={{
                                        style: { color: 'black', height: '38px' },
                                        className: 'hover:bg-secondary/[.6] text-black  bg-secondary/[.5] border-0'
                                    }}
                                    okButtonProps={{
                                        style: { color: 'black', height: '38px' },
                                        className: 'text-white hover:bg-primary/[.9] bg-primary/[.8] border-0 shadow-none'
                                    }}
                                >
                                    <p className='text-xl font-semibold text-center pb-3'>Thêm địa chỉ</p>
                                    <hr />
                                    <div className='grid grid-cols-2 flex items-center pt-4 gap-4'>
                                        <p>Chọn tỉnh/thành phố</p>
                                        <Select
                                            showSearch
                                            placeholder="Chọn tỉnh/thành phố"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={filterOption}
                                            options={itemsTinh.map(item => ({ label: item.label, value:item.value }))}
                            
                                        />
                                        <p>Chọn quận/huyện</p>
                                        <Select
                                            showSearch
                                            placeholder="Chọn quận/huyện"
                                            optionFilterProp="children"
                                            filterOption={filterOption}
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            options={itemsHuyen.map(item => ({ label: item.label, value:item.value }))}
                                        />
                                        <p>Chọn phường/xã</p>
                                        <Select
                                            showSearch
                                            placeholder="Chọn phường/xã"
                                            optionFilterProp="children"
                                            filterOption={filterOption}
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            options={itemsXa.map(item => ({ label: item.label, value:item.value }))}
                                        />
                                        <Input placeholder='Số nhà/Đường' className='col-span-2'></Input>
                                        <Checkbox className='text-base'>Đặt làm mặc định</Checkbox>
                                    </div>
                                </Modal>
                            </span>

                        </div>
                        <div className='flex flex-col h-full items-center justify-center mb-10'>
                            <TfiMapAlt className='text-7xl text-secondary/[.4] mb-2' />
                            Bạn chưa có địa chỉ
                        </div>
                    </Content>
                ) : null}

                {/* Đổi mật khẩu */}
                {valueMenu === 'sub3' ? (
                    <Content className='bg-white flex items-center justify-center grid grid-cols-2 bg-white ml-12 px-16 h-[590px]'>
                        <div className='flex flex-col items-center gap-2 mr-8'>
                        <Image src={logo} className='w-16'></Image>
                        <p className='font-semibold text-xl'>ĐỔI MẬT KHẨU</p>
                        {/* <p><FaCheck className='text-primary mr-2'/>Mật khẩu phải có ít nhất 8 ký tự</p> */}
                        </div>
                        <div>
                            <Form
                                name="registration"
                                autoComplete="off"
                                className="w-full"
                            >
                                <p className='mb-1'>Mật khẩu cũ</p>
                                <Form.Item
                                    label=""
                                    name="old_password"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
                                        { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                                <p className='mb-1'>Mật khẩu mới</p>
                                <Form.Item
                                    label=""
                                    name="new_password"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                                        { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                                <p className='mb-1'>Xác nhận mật khẩu mới</p>
                                <Form.Item
                                    label=""
                                    name="confirm_password"
                                    rules={[
                                        { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                                        { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" className="mt-2 bg-primary/[.8] hover:bg-primary/[.9] w-full border-none" htmlType="submit">
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                ) : null}
                {/* Đơn mua */}
                {valueMenu === '2' || valueMenu === 'tat-ca' ? (
                    <div className='w-full flex flex-col ml-12'>
                        <div className='w-full'>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                className='gap-8 px-4'
                                defaultSelectedKeys={['tat-ca']}
                                onClick={handleMenu}
                            >
                                <Menu.Item key="tat-ca">Tất cả</Menu.Item>
                                <Menu.Item key="cho-thanh-toan">Chờ thanh toán</Menu.Item>
                                <Menu.Item key="van-chuyen">Vận chuyển</Menu.Item>
                                <Menu.Item key="hoan-thanh">Hoàn thành</Menu.Item>
                                <Menu.Item key="da-huy">Đã hủy</Menu.Item>
                                <Menu.Item key="tra-hang">Trả hàng/Hoàn tiền</Menu.Item>
                            </Menu>
                        </div>
                        <div>
                            <Input
                                size="large"
                                placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên sản phẩm"
                                prefix={<IoSearch />}
                                style={{ fontSize: '14px', lineHeight: '27px' }}
                                className='gap-1 border-0 my-2 rounded-none'
                            />
                        </div>
                        <div>
                            <div className='bg-white gap-2 flex flex-col items-center justify-center h-[480px]'>
                                <TbMoodEmpty className='text-7xl' />
                                <span className='text-base'>Chưa có đơn hàng</span>
                            </div>
                        </div>
                    </div>
                ) : null}
                {valueMenu === 'cho-thanh-toan' || valueMenu === 'van-chuyen' || valueMenu === 'cho-giao-hang' || valueMenu === 'hoan-thanh' || valueMenu === 'da-huy' ? (
                    <div className='w-full flex flex-col ml-12'>
                        <div className='w-full'>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                className='gap-8 px-4 mb-2'
                                onClick={handleMenu}
                            >
                                <Menu.Item key="tat-ca">Tất cả</Menu.Item>
                                <Menu.Item key="cho-thanh-toan">Chờ thanh toán</Menu.Item>
                                <Menu.Item key="van-chuyen">Vận chuyển</Menu.Item>
                                <Menu.Item key="hoan-thanh">Hoàn thành</Menu.Item>
                                <Menu.Item key="da-huy">Đã hủy</Menu.Item>
                                <Menu.Item key="tra-hang">Trả hàng/Hoàn tiền</Menu.Item>
                            </Menu>
                        </div>
                        <div>
                            <div className='bg-white gap-2 flex flex-col items-center justify-center h-[535px]'>
                                <TbMoodEmpty className='text-7xl' />
                                <span className='text-base'>Chưa có đơn hàng</span>
                            </div>
                        </div>
                    </div>
                ) : null}
                {valueMenu === 'tra-hang' ? (
                    <div className='w-full flex flex-col ml-12'>
                        <div className='w-full'>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                className='gap-8 px-4 mb-2'
                                onClick={handleMenu}
                            >
                                <Menu.Item key="tat-ca">Tất cả</Menu.Item>
                                <Menu.Item key="cho-thanh-toan">Chờ thanh toán</Menu.Item>
                                <Menu.Item key="van-chuyen">Vận chuyển</Menu.Item>
                                <Menu.Item key="hoan-thanh">Hoàn thành</Menu.Item>
                                <Menu.Item key="da-huy">Đã hủy</Menu.Item>
                                <Menu.Item key="tra-hang">Trả hàng/Hoàn tiền</Menu.Item>
                            </Menu>
                        </div>
                        <div>
                            <div className='bg-white gap-2 flex flex-col items-center justify-center h-[535px]'>
                                <TbMoodEmpty className='text-7xl' />
                                <span className='text-base'>Bạn hiện không có yêu cầu Trả hàng/Hoàn tiền nào</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Layout>
        </div>

    );
}