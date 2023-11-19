import Image from 'next/image';

export default function SearchItems({ data }) {
    const formatMoney = (money) => {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <div className="w-[400px] h-2/3 bg-white border-[1px] rounded-lg shadow-lg
         overflow-y-scroll">
            <div className="pl-5 pt-4 text-black text-sm">
                <p className='text-black font-semibold'>{data?.title1}</p>
                {data?.recommendations1?.map((item) => (
                    <p className='my-2'><a href="#" className='text-[rgb(0,101,238)]'>{item}</a></p>
                ))}
                <p className='text-black font-semibold'>{data?.title2}</p>
                {data?.recommendations2?.map((item, index) => (
                    <div className='flex items-center align-center gap-4 mb-1 text-black'>
                        <a href="#"><Image src={data?.recommendations2[index]?.img} style={{ width: '90px', height: '90px' }} className='border-[1px] border-rgb(230, 232, 234) p-1 rounded-lg mt-3' /></a>
                        <span>
                            <p><a href='#' className='font-semibold text-black'>{data?.recommendations2[index]?.name}</a></p>
                            <p><a href='#' className='font-medium text-[rgb(254,52,100)]'>{formatMoney(data?.recommendations2[index]?.price)}</a></p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}