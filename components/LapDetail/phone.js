import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react'
import { Carousel } from 'antd';
import { InputNumber } from 'antd';
import { Input } from 'antd';
import { OFFLINE_STORES } from "@/app.config";
import logo from '@/public/uit.png'
import l1 from '@/public/cat01.jpg'
import l2 from '@/public/cat02.jpg'
import l3 from '@/public/cat03.jpg'
import l4 from '@/public/cat04.jpg'
import l5 from '@/public/cat05.jpg'
import l6 from '@/public/cat06.jpg'
import Image from 'next/image'

const Apps = () => {
  const [config, setConfig] = useState(false);
  const openConfig = () => {
    setConfig(true);
  };
  const closeConfig = () => {
    setConfig(false);
  };

  const [buy, setBuy] = useState(false);
  const openBuy = () => {
    setBuy(true);
  }
  const closeBuy = () => {
    setBuy(false);
  }
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [quan, setQuan] = useState(1)
  const increase = (event) => {
    setQuan(quan + 1)
  }
  const decrease = (event) => {
    if(quan > 1)
      setQuan(quan - 1)
  }
  return (
    <div className=''>
      <div className='p-4 flex flex-col gap-2 bg-white overflow-y-auto'>
        {/* hình ảnh */}
        <Carousel afterChange={onChange}>
          <div className='h-[300px] text-primary'>
            <Image src={l1} alt='img1' className='w-full h-full' />
          </div>
          <div className='h-[300px]'>
            <Image src={l2} alt='img2' className='w-full h-full' />
          </div>
          <div className='h-[300px]'>
            <Image src={l3} alt='img3' className='w-full' />
          </div>
          <div className='h-[300px]'>
            <Image src={l4} alt='img4' className='w-full' />
          </div>
          <div className='h-[300px]'>
            <Image src={l5} alt='img5' className='w-full' />
          </div>
          <div className='h-[300px]'>
            <Image src={l6} alt='img6' className='w-full' />
          </div>

        </Carousel>
        {/* Tên,giá */}
        <div className='p-2 rounded bg-slate-100'>
          <p className='text-xs'>SKU: Inspirion 14543002NS</p>
          <p className="font-semibold text-lg">Dell Inspirion 14 5430</p>
          <p className='text-red-500 text-lg font-semibold'>17.000.000</p>
        </div>
        {/* Cấu hình */}
        <div className='bg-slate-100 p-2 rounded'>
          <div className="flex justify-between">
            <p className="font-semibold text-sm">Cấu hình đặc điểm</p>
            <a onClick={openConfig} className='text-sm'>Xem cấu hình chi tiết</a>
            <Modal
              isOpen={config}
              onRequestClose={closeConfig}
              contentLabel="Example Modal"
              className="h-screen w-screen bg-transparent flex justify-center items-center"
            >
              <div className='rounded-lg bg-white h-5/6 w-full border p-4 grid grid-cols-1 gap-4 overflow-y-auto'>
                <div className=' flex justify-between items-start'>
                  <p className='font-semibold text-base'>Cấu hình chi tiết</p>
                  <button className='text-base font-bold' onClick={closeConfig}>X</button>
                </div>
                <div className='grid grid-cols-2 grid-rows-6 gap-2'>
                  <div className=''>
                    <p className='font-semibold text-sm'>Bộ xử lý</p>
                    <p className='text-xs'>Loại CPU: Intel Core i5 1240P, 12C/16T<br />Tốc độ: 1.0GHz, Lên tới 4.4GHz<br />Bộ nhớ đệm: 12MB</p>
                  </div>
                  <div className=''>
                    <p className='font-semibold text-sm'>RAM</p>
                  </div>
                  <div className=''>
                    <p className='font-semibold text-sm'>Màn hình</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>Pin</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>Card đồ họa</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>Ổ cứng</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>Khối lượng và Kích thước</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>Webcam và Âm thanh</p>
                  </div>
                  <div className=''>
                    <p className='font-semibold text-sm'>Cổng kết nối</p>
                  </div>
                  <div className=''>
                    <p className='font-semibold text-sm'>Kết nối</p>
                  </div>
                  <div className=''>
                    <p className='font-semibold text-sm'>Hệ điều hành</p>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        {/* trưng bày */}
        <div className="bg-slate-100 p-2 rounded">
          <p className="font-semibold text-sm">Sẵn hàng & trưng bày</p>
          <div className='text-primary'>
            <p className='text-xs'>{OFFLINE_STORES[0].name}</p>
            <p className='text-xs'>{OFFLINE_STORES[0].address}</p>
          </div>
        </div>
        {/* Vận chuyển */}
        <div className='bg-slate-100 p-2 rounded'>
          <p className="font-semibold text-sm">Vận chuyển</p>
          <p className='text-primary text-xs'>Miễn phí TP.HCM</p>
        </div>
        {/* Bảo hành */}
        <div className='bg-slate-100 p-2 rounded'>
          <p className="font-semibold text-sm">Bảo hành & đổi trả</p>
          <li className='text-primary text-xs'>Bảo hành 12 tháng tại cửa hàng</li>
          <li className='text-primary text-xs'>Đổi mới trong 15 ngày đầu tiên</li>
        </div>
        {/* Hãng */}
        <div className='flex justify-between bg-slate-100 p-2 rounded'>
          <div className='inline-flex w-1/2 gap-2 items-center'>
            <Image src={logo} className='w-1/6' />
            <p className='font-semibold text-sm'>UIT</p>
          </div>
          <a href='#' className='text-sm'>Xem tất cả</a>
        </div>
        <br />
        <br />
        <br />
      </div>
      {/* Nút */}
      <div className='fixed bottom-0 flex gap-4 bg-white p-4 justify-between w-full border-2'>
        <button className='border rounded bg-primary font-semibold text-white p-2 w-1/2'>Thêm vào giỏ</button>
        <button className='border rounded bg-primary font-semibold text-white p-2 w-1/2' onClick={openBuy}>Mua ngay</button>
        <Modal
          isOpen={buy}
          onRequestClose={closeBuy}
          contentLabel="Example Modal"
          className="h-full bg-transparent flex justify-center items-end"
        >
          <div className='bg-white border h-[600px] w-full p-2 rounded-3xl overflow-y-auto'>
            <div className='flex justify-between border-b p-2'>
              <div className=' w-full text-center'>
                <p>Chọn phiên bản</p>
              </div>
              <button className='text-base font-semibold' onClick={closeBuy}>X</button>
            </div>
            <div className='flex justify-center p-6'>
              <div className='w-1/2'>
                <Image src={l3} className=''></Image>
              </div>
              <div className='w-full self-center p-4'>
                <p className='text-pink-600 font-semibold text-lg'>17.000.000</p>
              </div>
            </div>
            <div className='p-6'>
              <p className="font-semibold text-black/[.5] text-sm">Phiên bản</p>
            </div>
            <div className='p-6 flex flex-col gap-3'>
              <p className="font-semibold text-black/[.5] text-sm">Số lượng</p>
              <div className='flex'>
                <button className='border w-1/12 rounded-l-lg text-2xl'onClick={decrease}> - </button>
                <Input className='border-y border-x-none w-2/12 rounded-none' value={quan}/>
                <button className='border w-1/12 rounded-r-lg text-2xl' onClick={increase}> + </button>
              </div>
            </div>
            <br />
            <br />
            <div className='fixed bottom-0 flex gap-2 pb-2 justify-between w-full'>
              <button className='border rounded bg-primary font-semibold text-white p-2 w-1/2'>Thêm vào giỏ</button>
              <button className='border rounded bg-primary font-semibold text-white p-2 w-1/2' onClick={openBuy}>Mua ngay</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Apps;