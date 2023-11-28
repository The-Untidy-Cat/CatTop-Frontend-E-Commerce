import Image from 'next/image'
import Modal from 'react-modal';
import logo from '@/public/uit.png'
import l1 from '@/public/cat01.jpg'
import l2 from '@/public/cat02.jpg'
import l3 from '@/public/cat03.jpg'
import l4 from '@/public/cat04.jpg'
import l5 from '@/public/cat05.jpg'
import l6 from '@/public/cat06.jpg'
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import { useState } from 'react'
import { OFFLINE_STORES } from "@/app.config";
import { Input } from 'antd';

export default function Detail() {
    const [quan, setQuan] = useState(1)
  const increase = (event) => {
    setQuan(quan + 1)
  }
  const decrease = (event) => {
    if(quan > 1)
      setQuan(quan - 1)
  }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onChangeNumber = (value) => {
        console.log('changed', value);
    };

    const [img, setImg] = useState(l1);
    const handleImage = (event) => {
        const src = event.target.getAttribute('src');
        setImg(src);
    }
    return (
        <div className="flex flex-col">
            <div className="flex justify-center gap-5">
                <div className="flex flex-col gap-2 w-7/12">
                    <div className="flex bg-white md:[h-100px] lg:h-[500px] px-4 py-8">
                        <div className='flex flex-col overflow-y-scroll h-full w-3/12 gap-5 p-2 lg:p-4'>
                            <Image src={l1} alt='img1' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                            <Image src={l2} alt='img2' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                            <Image src={l3} alt='img3' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                            <Image src={l4} alt='img4' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                            <Image src={l5} alt='img5' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                            <Image src={l6} alt='img6' className='cursor-pointer focus:border-2 focus:rounded focus:border-primary/[.5] p-2' tabIndex="0" onClick={handleImage} />
                        </div>
                        <div className='grid-cols-1 w-full'>
                            <div className='flex justify-center items-center h-5/6'>
                                <Image src={img} alt='lap-select' width={200} height={0} className='w-8/12' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white gap-2 p-4">
                        <div className='border-b py-4'>
                            <div className="flex justify-between">
                                <p className="font-semibold text-lg">Cấu hình đặc điểm</p>
                                <a onClick={openModal}>Xem cấu hình chi tiết</a>
                                <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Example Modal"
                                    className="h-screen w-screen bg-transparent flex justify-center items-center"
                                >
                                    <div className='rounded-lg bg-white h-5/6 w-full md:w-8/12 lg:w-1/2 border p-8 grid grid-cols-1 gap-4 overflow-y-auto'>
                                        <div className=' flex justify-between items-start'>
                                            <p className='font-semibold text-xl'>Cấu hình chi tiết</p>
                                            <button className='ext-xl font-bold' onClick={closeModal}>X</button>
                                        </div>
                                        <div className='grid grid-cols-2 grid-rows-6 gap-2'>
                                            <div className=''>
                                                <p className='font-semibold'>Bộ xử lý</p>
                                                <p>Loại CPU: Intel Core i5 1240P, 12C/16T</p>
                                                <p>Tốc độ: 1.0GHz, Lên tới 4.4GHz</p>
                                                <p>Bộ nhớ đệm: 12MB</p>
                                            </div>
                                            <div className=''>
                                                <p className='font-semibold'>RAM</p>
                                            </div>
                                            <div className=''>
                                                <p className='font-semibold'>Màn hình</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Pin</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Card đồ họa</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Ổ cứng</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Khối lượng và Kích thước</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Webcam và Âm thanh</p>
                                            </div>
                                            <div className=''>
                                                <p className='font-semibold'>Cổng kết nối</p>
                                            </div>
                                            <div className=''>
                                                <p className='font-semibold'>Kết nối</p>
                                            </div>
                                            <div className=''>
                                                <p className='font-semibold'>Hệ điều hành</p>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                            <div className='grid grid-cols-2 grid-rows-4 gap-4'>
                                <div>
                                    <p className='font-semibold'>Bộ xử lý</p>
                                    <p>Loại CPU: Intel Core i5 1240P, 12C/16T</p>
                                    <p>Tốc độ: 1.0GHz, Lên tới 4.4GHz</p>
                                    <p>Bộ nhớ đệm: 12MB</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>RAM</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Màn hình</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Pin</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Card đồ họa</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Ổ cứng</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Khối lượng và Kích thước</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Webcam và Âm thanh</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid border-b py-4">
                            <p className="font-semibold text-lg">Sẵn hàng & trưng bày</p>
                            <div className='text-primary'>
                                <p>{OFFLINE_STORES[0].name}</p>
                                <p>{OFFLINE_STORES[0].address}</p>
                            </div>
                        </div>
                        <div className='border-b py-4'>
                            <p className="font-semibold text-lg">Vận chuyển</p>
                            <p className='text-primary'>Miễn phí TP.HCM</p>
                        </div>
                        <div className='py-4'>
                            <p className="font-semibold text-lg">Bảo hành & đổi trả</p>
                            <li className='text-primary'>Bảo hành 12 tháng tại cửa hàng</li>
                            <li className='text-primary'>Đổi mới trong 15 ngày đầu tiên</li>
                        </div>
                    </div>
                </div>
                <div className="sticky top-0 flex flex-col w-5/12 gap-2 overflow-y-auto h-screen">
                    <div className="bg-white p-4">
                        <div className='border-b pb-4'>
                            <p>SKU:...</p>
                            <p className="font-semibold text-lg">/Tên laptop/</p>
                        </div>
                        <div className='grid grid-cols-1 py-4 gap-2 border-b'>
                            <div>
                                <p className="font-semibold text-black/[.5]">Phiên bản</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="font-semibold text-black/[.5]">Số lượng</p>
                                <div className='flex'>
                                    <button className='border-black/[.7] border w-1/12 rounded-l-lg text-2xl' onClick={decrease}> - </button>
                                    <Input className='border-black/[.7] border-y border-x-0 w-2/12 rounded-none' value={quan} />
                                    <button className='border-black/[.7] border w-1/12 rounded-r-lg text-2xl' onClick={increase}> + </button>
                                </div>

                            </div>
                        </div>
                        <div className='flex justify-between pt-4'>
                            <div>
                                <p className='text-red-600 text-lg font-semibold'>
                                    17.000.000
                                </p>
                            </div>
                            <div className='grid lg:flex gap-4'>
                                <button className='border rounded bg-primary font-semibold text-white p-2'>Thêm vào giỏ</button>
                                <button className='border rounded bg-primary font-semibold text-white p-2'>Mua ngay</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 flex justify-between items-center">
                        {/* Hãng Laptop */}
                        <div className='inline-flex w-1/2 gap-2 items-center'>
                            <Image src={logo} className='w-2/6' />
                            <p className='borer font-semibold'>UIT</p>
                        </div>
                        <a href='#'>Xem tất cả</a>
                    </div>
                </div>
            </div>
        </div>
    );
}