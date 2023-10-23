import { TbMoodEmpty } from 'react-icons/tb';
export default function Cart() {
    return (
        <main className='bg-secondary/[.4]'>
            <div className='pt-4 pb-14 ml-[50px] mr-[40px]'>
                <p className='font-semibold text-lg mb-3'>Giỏ hàng (0)</p>
                <div class="flex flex-wrap space-x-0 xl:space-x-5">
                    <div class="bg-white w-full h-[420px] mb-5 md:w-[780px] ">
                        <section className='flex flex-col items-center py-20'>
                            <TbMoodEmpty className='text-6xl text-primary' />
                            <div className="mt-4 flex flex-col items-center">
                                <span className='font-semibold text-base mt-2'>Giỏ hàng trống
                                </span>
                                <p className='text-sm mt-4 text-center'>Hãy thoải mái lựa chọn sản phẩm bạn nhé</p>
                                <div className="mt-10">
                                    <button className='bg-primary/[.9] text-white font-bold py-2.5 px-3 rounded-md hover:bg-primary'>Khám phá ngay</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="bg-white h-64 pl-7 w-[780px] xl:w-1/3">
                        <h3 className='font-semibold text-xl pt-5'>Tóm tắt đơn hàng</h3>
                        <p className="text-base pt-5">Giảm giá</p>
                        <div className='border-t border-dashed w-11/12 mt-5'></div>
                        <p className='text-base pt-5'>Tổng tiền</p>
                        <div className="mt-8">
                            <button className='bg-primary/[.3] text-gray-500 font-semibold py-2.5 px-3 rounded-md w-11/12'>Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}