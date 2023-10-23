import Image from 'next/image';
import logo from '@/public/logo.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoCallSharp } from 'react-icons/io5';
import { AiFillGithub, AiOutlineCopyrightCircle, AiFillClockCircle} from 'react-icons/ai';
import uit from '@/public/uit.png';
export default function Footer() {
    return (
        <footer>
            <div className='p-10 bg-secondary/[.5]'>
                <div className='grid grid-cols-2'>
                    <div className='pl-10'>
                        <p className='flex'>
                            <Image src={logo} className='w-16'></Image>
                            <span className="text-primary font-bold text-3xl pt-3 pl-3">CATTOP</span>
                        </p>
                        <p className="text-primary font-bold text-lg py-3">HỆ THỐNG CỬA HÀNG</p>
                        <p className="font-bold text-lg">MIỀN NAM</p>
                        <p className='flex items-center align-center gap-1 text-sm pt-2'>
                            <FaMapMarkerAlt className='m-0 p-0 text-lg text-primary'/>KP6, P. Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh
                        </p>
                        <p className='flex items-center align-center gap-1 text-sm pt-2'>
                            <IoCallSharp className='m-0 p-0 text-lg text-primary'/>1234567890
                        </p>
                        <p className='flex items-center align-center gap-1 text-sm pt-2'>
                            <AiFillClockCircle className='m-0 p-0 text-lg text-primary'/>00:00 - 23:59
                        </p>
                    </div>
                    <div className='px-2'>
                        <p className='font-bold text-lg text-primary px-20'>LIÊN KẾT NHANH</p>
                        <ol className='px-20'>
                            <li className='pt-5'><a href="#">abc</a></li>
                            <li className='pt-5'><a href="#">xyz</a></li>
                            <li className='pt-5'><a href="#">tpa</a></li>
                            <li className='pt-5'><a href="#">web</a></li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className='pl-20 pt-8'>
                <p><AiOutlineCopyrightCircle className='text-lg'/>  The Untidy Cat 2023</p>
                <p className='text-sm'>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH<br></br>
                    TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
                    VNUHCM - UIT
                </p>
                <br></br>
                <span className='flex'><Image src={uit} className='w-8'/><AiFillGithub className='text-3xl'/></span>
            </div>
        </footer>
    );
}