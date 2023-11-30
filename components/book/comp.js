import Image from 'next/image';
import { useState } from 'react';
import { Cascader, Radio, Checkbox, Input, Select, Space, Button } from 'antd';
import { Modal } from 'antd';
import { FiPlus } from 'react-icons/fi';
import logo from '@/public/uit.png'
import StyleContext from '@ant-design/cssinjs/lib/StyleContext';


export default function Booking() {
    // Địa chỉ (ẩn/hiện Model)
    const [address, setAddress] = useState(false);
    const openAddress = () => {
        console.log("mở")
        setAddress(true)
    }
    const closeAddress = () => {
        setAddress(false)
    }
    // Thay đổi địa chỉ
    const [Venue, setVenue] = useState(1);
    const onChangeAddress = (e) => {
        setVenue(e.target.value);
    };
    // Thêm địa chỉ (ẩn/hiện Model)
    const [addLocation, setLocation] = useState(false);
    const openLocation = () => {
        setLocation(true)
    }
    const closeLocation = () => {
        setLocation(false)
        setAddress(true)
    }
    // Nhận hàng
    const [NH, setNH] = useState(1);
    const onChangeNhanHang = (e) => {
        setNH(e.target.value);
    };
    // Thanh toán
    const [TT, setTT] = useState(1);
    const onChangeTT = (e) => {
        setTT(e.target.value);
    };
    // Tổng tiền hàng
    const [sumOrder, setSumOrder] = useState(50000000)
    // Function format giá tiền
    let formatMoney = (money) => {
        let str = money.toString()
        let arr = [...str];
        str = arr[arr.length - 1]
        let d = 1
        for (let i = arr.length - 2; i >= 0; i--) {
            if (d % 3 == 0) {
                d++;
                str = arr[i] + '.' + str
            } else {
                d++;
                str = arr[i] + str
            }
        }
        return str;
    }
    //Select
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Object
    const Ng = {
        ten: "Trương Nguyễn Ngọc Minh",
        sdt: "0984797117",
    }
    const DC = {
        tinh: 'Bình Định',
        huyen: 'Tây Sơn',
        xa: 'Phú Phong',
        chiTiet: '298, Trần Hưng Đạo'
    }
    const SP = {
        src: { logo },
        ten: "Dell G5",
        dg: 25000000,
        sl: 2,
    }


    return (
        <div className='flex flex-col bg-secondary w-full h-full gap-2 p-8 lg:p-40'>
            <div className='rounded bg-white p-4 grid gap-2'>
                <div className='grid grid-cols-4'>
                    <p className='text-primary font-semibold'>Sản phẩm</p>
                    <p className='text-primary font-semibold'>Đơn giá</p>
                    <p className='text-primary font-semibold'>Số lượng</p>
                    <p className='text-primary font-semibold'>Thành tiền</p>
                </div>
                <div className='grid grid-cols-4 pt-4 border-t pace-items-center'>
                    <div className=''>
                        <Image src={SP.src} />
                        <p>{SP.ten}</p>
                    </div>
                    <div className=''>
                        {formatMoney(SP.dg)}
                    </div>
                    <div className=''>
                        {formatMoney(SP.sl)}
                    </div>
                    <div className=''>
                        {formatMoney(SP.dg * SP.sl)}
                    </div>
                </div>
            </div>
            <div className='rounded bg-white p-4 grid grid-cols-3 place-items-cente lg:grid-cols-4 items-center'>
                <div className=' grid grid-rows-2 gap-2 lg:col-span-3 col-span-2'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-primary'>Phương thức nhận hàng</p>
                        <Radio.Group onChange={onChangeNhanHang} value={NH}>
                            <Space direction="vertical">
                                <Radio value={1}>Tại cửa hàng</Radio>
                                <Radio value={2}>Giao tận nơi</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-primary'>Phương thức thanh toán</p>
                        <Radio.Group onChange={onChangeTT} value={TT}>
                            <Space direction="vertical">
                                <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={2}>Thanh toán trực tuyến</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    {NH === 2 ? (
                        <div className="flex flex-col gap-2">
                            <p className='font-semibold text-primary'>Địa chỉ nhận hàng</p>
                            <div className="grid grid-cols-6 gap-2 items-center">
                                <div className='col-span-2'>
                                    <p>{Ng.ten}</p>
                                    <p>{Ng.sdt}</p>
                                </div>
                                <div className='col-span-3'>
                                    <p>{DC.chiTiet}</p>
                                    <p>{DC.xa}, {DC.huyen}, {DC.tinh}</p>
                                </div>
                                <div className=''>
                                    <a onClick={openAddress}>Thay đổi</a>
                                    <Modal
                                        centered
                                        open={address}
                                        onOk={closeAddress}
                                        onCancel={closeAddress}
                                        okText="Xác nhận"
                                        cancelText="Trở lại"
                                        okButtonProps={
                                            {
                                                className: 'bg-primary hover:bg-primary/[.8]'
                                            }
                                        }
                                    >
                                        <p className='text-lg font-semibold text-center w-full text-primary pb-2'>Thay đổi địa chỉ</p>
                                        <Radio.Group onChange={onChangeAddress} value={Venue} className='w-full'>
                                            <Space direction="vertical" className='w-full'>
                                                <div className='grid grid-cols-12 gap-2 border-t py-2'>
                                                    <Radio value={1} className='place-self-center'></Radio>
                                                    <div className='text-base col-span-9'>
                                                        <p>{DC.chiTiet}</p>
                                                        <p>{DC.xa}, {DC.huyen}, {DC.tinh}</p>
                                                    </div>
                                                    <a className='text-base text-primary col-span-2' onClick={openLocation}>Thay đổi</a>
                                                </div>
                                            </Space>
                                        </Radio.Group>
                                        <div className='flex justify-center border-t pt-2'>
                                            <Button
                                                type='primary'
                                                className='flex bg-primary p-2 justify-between items-center gap-1 hover:bg-primary/[.8]'
                                                onClick={openLocation}
                                            >
                                                <FiPlus />
                                                <p className=''>Thêm địa chỉ mới</p>
                                            </Button>
                                            <Modal
                                                centered
                                                open={addLocation}
                                                onOk={closeLocation}
                                                onCancel={closeLocation}
                                                okText="Xác nhận"
                                                cancelText="Trở lại"
                                                okButtonProps={
                                                    {
                                                        className: 'bg-primary hover:bg-primary/[.8]'
                                                    }
                                                }
                                            >
                                                <div className='flex justify-between border-b pb-2'>
                                                    <p className='font-semibold text-center w-full text-primary text-lg'>Thêm địa chỉ</p>
                                                </div>
                                                <div className="grid grid-rows-3 gap-4 py-4">
                                                    <div className='grid grid-cols-2'>
                                                        <p className=''>Chọn thành phố/tỉnh</p>
                                                        <Select
                                                            showSearch
                                                            placeholder="Thành phố/Tỉnh"
                                                            optionFilterProp="children"
                                                            onChange={onChange}
                                                            onSearch={onSearch}
                                                            filterOption={filterOption}
                                                            options={[
                                                                {
                                                                    value: 'An Giang',
                                                                    label: 'An Giang',
                                                                },
                                                                {
                                                                    value: 'Bạc Liêu',
                                                                    label: 'Bạc Liêu',
                                                                },
                                                                {
                                                                    value: 'Cần Thơ',
                                                                    label: 'Cần Thơ',
                                                                },
                                                                {
                                                                    value: 'Bình Định',
                                                                    label: 'Bình Định',
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-2'>
                                                        <p>Chọn quận/huyện</p>
                                                        <Select
                                                            showSearch
                                                            placeholder="Quận/Huyện"
                                                            optionFilterProp="children"
                                                            onChange={onChange}
                                                            onSearch={onSearch}
                                                            filterOption={filterOption}
                                                            options={[
                                                                {
                                                                    value: 'Tây Sơn',
                                                                    label: 'Tây Sơn',
                                                                },
                                                                {
                                                                    value: 'Phù Cát',
                                                                    label: 'Phù Cát',
                                                                },
                                                                {
                                                                    value: 'Tam Quan',
                                                                    label: 'Tam Quan',
                                                                },
                                                                {
                                                                    value: 'Quy Nhơn',
                                                                    label: 'Quy Nhơn',
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-2'>
                                                        <p>Chọn phường/xã</p>
                                                        <Select
                                                            showSearch
                                                            placeholder="Phường/Xã"
                                                            optionFilterProp="children"
                                                            onChange={onChange}
                                                            onSearch={onSearch}
                                                            filterOption={filterOption}
                                                            options={[
                                                                {
                                                                    value: 'An Giang',
                                                                    label: 'An Giang',
                                                                },
                                                                {
                                                                    value: 'Bạc Liêu',
                                                                    label: 'Bạc Liêu',
                                                                },
                                                                {
                                                                    value: 'Cần Thơ',
                                                                    label: 'Cần Thơ',
                                                                },
                                                                {
                                                                    value: 'Bình Định',
                                                                    label: 'Bình Định',
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='pb-4'>
                                                    <Input placeholder='Số nhà, đường'></Input>
                                                </div>
                                                <div>
                                                    <Checkbox>Đặt làm mặc định</Checkbox>
                                                </div>
                                            </Modal>
                                        </div>
                                    </Modal>

                                </div>
                            </div>
                        </div >
                    ) : null
                    }
                </div >
                <div className=''>
                    <div className='lg:flex justify-between items-center'>
                        <p>Tổng thanh toán:</p>
                        <p className='place-self-end text-2xl text-red-600'>{formatMoney(sumOrder)}</p>
                    </div>
                </div>
            </div >
        </div >
    );
}