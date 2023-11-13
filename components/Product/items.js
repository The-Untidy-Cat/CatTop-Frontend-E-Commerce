import Image from 'next/image';

export default function ProductItems({ data }) {
    const formatMoney = (money) => {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
      
    return (
        <div className='bg-white rounded-2xl p-4'>
            <a href="#" className='flex flex-col items-center'>
                <Image src={data?.img} style={{ width: '110px', height: '130px' }} ></Image>
                <span className='mt-2'>
                    <p className='font-semibold text-black text-sm mb-2'>{data?.name}</p>
                    Từ: <span className='text-base text-[rgb(254,52,100)] font-semibold'>{formatMoney(data?.price)}</span><br></br>
                    Màu: {data?.color}
                    <div className='border-b border-gray my-4'></div>
                    <div className='text-black text-xs'>
                        <p>CPU: {data?.specification?.cpu}</p>
                        <p>RAM: {data?.specification?.ram}</p>
                        <p>Ổ cứng: {data?.specification?.storage}</p>
                        <p>Màn hình: {data?.specification?.screen}</p>
                        <p>Card: {data?.specification?.card}</p>
                    </div>
                </span>
            </a>
        </div >
    )
}