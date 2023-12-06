import { Button, Modal, Input } from "antd";
import { useState } from 'react';
import { Rate } from 'antd';
import Image from 'next/image';
import logo from '@/public/uit.png'
import { Steps } from 'antd';

export default function OrderDetailView() {
    const { TextArea } = Input;
    const donHang = {
        maDH: "ABC123XYZ",
        trangThai: "Đã giao",
        ptNhanHang: "Giao tận nơi",
        ptThanhToan: "Khi nhận hàng",
        ngDatHang: "01/01/2023",
        ngNhanHang: "03/01/2023",
        diaChi: "298, Trần Hưng Đạo, Phú Phong, Tây Sơn, Bình Định"
    }
    const ctDonHang = {
        tenSP: "Máy A",
        dg: 10000000,
        sl: 2
    }
    const KhachHang = {
        ten: "Trịnh Thị Mỹ Chung",
        sdt: "0984797117"
    }
    const tongThanhToan = 20000000;

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

    // Mở/Đóng modal đánh giá
    const [RateModal, setRateModal] = useState(false)
    const openRate = () => setRateModal(true)
    const closeRate = () => setRateModal(false)

    return (
        <div className='flex flex-col bg-white w-full h-full gap-2 p-8 lg:p-40'>
            <div>
                {donHang.ptNhanHang === "Giao tận nơi"
                    ?
                    <Steps
                        size="small"
                        current={2}
                        items={[
                            {
                                title: 'Xác nhận',
                            },
                            {
                                title: 'Vận chuyển',
                            },
                            {
                                title: 'Nhận hàng',
                            },
                        ]}
                    />
                    :
                    <Steps
                        size="small"
                        current={2}
                        items={[
                            {
                                title: 'Xác nhận',
                            },
                            {
                                title: 'Nhận hàng',
                            },
                        ]}
                    />
                }
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <p className="font-semibold text-primary">Mã đơn hàng </p>
                    <p>{donHang.maDH}</p>
                </div>
                {/* <div>
                    <p className="font-semibold text-primary">Trạng thái </p>
                    <p>{donHang.trangThai}</p>
                </div> */}
            </div>
            <div className="border-t pt-2">
                <p className="font-semibold text-primary">Thông tin đơn hàng</p>
                <div className="grid grid-cols-2 gap-2">
                    <p>Tên khách hàng: {KhachHang.ten}</p>
                    <p>Số điện thoại: {KhachHang.sdt}</p>
                    <p>Ngày đặt hàng: {donHang.ngDatHang}</p>
                    <p>Ngày nhận hàng: {donHang.ngNhanHang}</p>
                    <p>Phương thức nhận hàng: {donHang.ptNhanHang}</p>
                    <p>Phương thức thanh toán: {donHang.ptThanhToan}</p>
                    <p>Địa chỉ: {donHang.diaChi}</p>
                </div>
            </div>
            <div className="grid border-t pt-2 gap-2">
                <div className="grid grid-cols-5 text-primary font-semibold">
                    <p>Sản phẩm</p>
                    <p>Đơn giá</p>
                    <p>Số lượng</p>
                    <p>Thành tiền</p>
                </div>
                <div className="grid grid-cols-5 items-center">
                    <p>{ctDonHang.tenSP}</p>
                    <p>{formatMoney(ctDonHang.dg)}</p>
                    <p>{ctDonHang.sl}</p>
                    <p>{formatMoney(ctDonHang.dg * ctDonHang.sl)}</p>
                    <div className="">
                        <Button className="bg-primary hover:bg-primary/[.8] text-white" onClick={openRate}>Đánh giá</Button>
                    </div>
                </div>
            </div>
            <div className="border-t grid grid-cols-4 pt-2">
                <p className="col-span-3">&nbsp;</p>
                <div className="flex items-center">
                    <p className="font-semibold">Tổng thanh toán: &nbsp;</p>
                    <p className="text-xl text-red-600">{formatMoney(tongThanhToan)}</p>
                </div>
            </div>
            <Modal
                centered
                open={RateModal}
                onOk={closeRate}
                onCancel={closeRate}
                okText="Xác nhận"
                cancelText="Trở lại"
                okButtonProps={
                    {
                        className: 'bg-primary hover:bg-primary/[.8]'
                    }
                }
            >
                <p className="border-b pb-2 text-primary font-semibold text-center">Đánh giá sản phẩm</p>
                <div className="pt-2 flex items-center gap-5 justify-start">
                    <Image src={logo} className="w-1/2" />
                    <p className="text-lg font-semibold">DELL G5</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Rate allowHalf defaultValue={2.5} />
                    <TextArea rows={4} placeholder="Nhập đánh giá" />
                </div>
            </Modal>
        </div>
    );
}