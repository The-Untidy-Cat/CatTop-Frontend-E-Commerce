import { Button, Form, Pagination, Rate } from "antd";
import RateItems from "./items";
import { useState } from "react";

export default function RateProduct() {
    const items5 = [
        {
            name: 'user1',
            rate: <Rate disabled defaultValue={5} className="text-xs"></Rate>,
            date: '2023-10-23 11:00',
            color: 'Xám',
            comment: 'Hàng đúng với mô tả, máy đẹp, test sơ các chức năng cần dùng đều ổn hết'
        },
        {
            name: 'user2',
            rate: <Rate disabled defaultValue={5} className="text-xs"></Rate>,
            date: '2023-11-02 09:15',
            color: 'Đen',
            comment: 'Hàng đẹp khỏi phải bàn, shop tư vấn nhiệt tình và có tâm'
        },
        {
            name: 'user3',
            rate: <Rate disabled defaultValue={5} className="text-xs"></Rate>,
            date: '2023-11-18 08:30',
            color: 'Xám',
            comment: 'Hàng đóng gói cẩn thận mở ra y như mới'
        },
        {
            name: 'user4',
            rate: <Rate disabled defaultValue={5} className="text-xs"></Rate>,
            date: '2023-11-29 16:45',
            color: 'Đen',
            comment: 'Giao hàng nhanh và đặc biệt đóng gói cẩn thận. Nhận được trong vòng ba ngày'
        },
        {
            name: 'user5',
            rate: <Rate disabled defaultValue={5} className="text-xs"></Rate>,
            date: '2023-11-19 12:21',
            color: 'Xám',
            comment: 'Sản phẩm tốt, giao hàng nhanh, đúng thông số kỹ thuật'
        },
    ];
    const items4 = [
        {
            name: 'user6',
            rate: <Rate disabled defaultValue={4} className="text-xs"></Rate>,
            date: '2022-01-19 17:45',
            color: 'Xám',
            comment: 'Test sơ các chức năng cần dùng đều ổn hết'
        },
        {
            name: 'user7',
            rate: <Rate disabled defaultValue={4} className="text-xs"></Rate>,
            date: '2022-10-10 07:46',
            color: 'Đen',
            comment: 'Shop tư vấn nhiệt tình và có tâm'
        },
        {
            name: 'user8',
            rate: <Rate disabled defaultValue={4} className="text-xs"></Rate>,
            date: '2023-12-31 06:24',
            color: 'Xám',
            comment: 'Nhân viên tư vấn nhiệt tình, máy chạy êm'
        },
        {
            name: 'user9',
            rate: <Rate disabled defaultValue={4} className="text-xs"></Rate>,
            date: '2023-04-04 17:59',
            color: 'Đen',
            comment: 'Giao hàng nhanh, đóng gói cẩn thận'
        },
        {
            name: 'user10',
            rate: <Rate disabled defaultValue={4} className="text-xs"></Rate>,
            date: '2023-09-12 14:41',
            color: 'Xám',
            comment: 'Sản phẩm tốt, giao hàng nhanh, đúng thông số kỹ thuật'
        },
    ];
    const items3 = [
        {
            name: 'user11',
            rate: <Rate disabled defaultValue={3} className="text-xs"></Rate>,
            date: '2022-12-16 14:46',
            color: 'Xám',
            comment: 'Nhân viên tư vấn chưa nhiệt tình, hàng giống với mô tả, gói hàng còn sơ xài'
        },
    ];
    const [valueRate, setValueRate] = useState();
    const [selectedValueRate, setSelectedValueRate] = useState();
    const handleMenu = (e) => {
        const key = e.currentTarget.getAttribute('data-key');
        setValueRate(key);
        setSelectedValueRate('items' + key);
    }

    return (
        <div className='bg-white lg:px-7 pl-6 py-6'>
            <p className="text-xl font-medium mb-4">ĐÁNH GIÁ SẢN PHẨM</p>
            <div className="grid grid-cols-3 gap-4 h-40 bg-secondary/[.2] border-secondary/[.6] border-[1px] py-10">
                <div className="flex flex-col items-center gap-2">
                    <p><span className="text-3xl text-primary/[.9] font-semibold">4.5 </span><span className="text-base text-primary/[.9] font-medium">trên 5</span></p>
                    <Rate allowHalf defaultValue={4.5} disabled className="w-full flex justify-center"/>
                </div>
                <div className="flex gap-4 col-span-2">
                    <Button
                        className="bg-white rounded-none"
                        data-key='all'
                        onClick={handleMenu}>Tất cả</Button>
                    <Button
                        className="bg-white rounded-none"
                        data-key='5'
                        onClick={handleMenu}
                    >5 sao (5)
                    </Button>
                    <Button
                        className="bg-white rounded-none"
                        data-key='4'
                        onClick={handleMenu}>4 sao (5)
                    </Button>
                    <Button
                        className="bg-white rounded-none"
                        data-key='3'
                        onClick={handleMenu}>3 sao (1)
                    </Button>

                    <Button
                        className="bg-white rounded-none"
                        data-key='2'
                        onClick={handleMenu}>2 sao (0)
                    </Button>

                    <Button
                        className="bg-white rounded-none"
                        data-key='1'
                        // onClick={handleRate}
                        onClick={handleMenu}>1 sao (0)
                    </Button>

                </div>
            </div>
            {valueRate === '5' || valueRate === 'all' ? (
                <div className="mt-5">
                    {/* <p>Hello world</p> */}
                    {items5.map((item) => {
                        return <RateItems data={item} value={valueRate} />
                    })}
                </div>
            ) : null}
            {valueRate === '4' ? (
                <div className="mt-5">
                    {/* <p>Hello world</p> */}
                    {items4.map((item) => {
                        return <RateItems data={item} value={valueRate} />
                    })}
                </div>
            ) : null}
            {valueRate === '3' ? (
                <div className="mt-5">
                    {/* <p>Hello world</p> */}
                    {items3.map((item) => {
                        return <RateItems data={item} value={valueRate} />
                    })}
                </div>
            ) : null}

            <Pagination defaultCurrent={1} className="mt-4 flex justify-center" />
        </div>
    )
}