import Link from "next/link";
import { AutoComplete, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import SearchItems from "./items";
import { useState } from "react";
import logo from '@/public/uit.png';

export default function Header() {
    // const SearchBar = () => {
    const [data, setData] = useState([]);
    const handleSearch = (value) => {
        // Gọi API hoặc thực hiện logic tìm kiếm ở đây để lấy dữ liệu
        // Ở đây mình sử dụng một số dữ liệu giả định
        const resultData = [
            'React',
            'Angular',
            'Vue.js',
        ];

        setData(resultData);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    const items = [
        {
            title1: 'Có thể bạn muốn tìm kiếm',
            recommendations1: [
                'Laptop',
                'Laptop HP',
                'Laptop HP ENVY',
                'PC HP'
            ],
            title2: 'Sản phẩm',
            recommendations2: [
                {
                    img: logo,
                    name: 'HP ProBook 440 G8',
                    price: '12990000',
                },
                {
                    img: logo,
                    name: 'HP Elitebook 840 G7',
                    price: '11990000',
                },
                {
                    img: logo,
                    name: 'HP Pavilion 14 x360 2022',
                    price: '13490000',
                },
                {
                    img: logo,
                    name: 'HP Envy 14 2 in 1 2023',
                    price: '15490000',
                },
                {
                    img: logo,
                    name: 'HP Papilion 9678',
                    price: '17590000',
                }
            ]
        },
        // {
        //     title1: 'Có thể bạn muốn tìm kiếm',
        //     recommendations1: [
        //         'Laptop',
        //         'Laptop Dell', 
        //         'Laptop Dell Latitude',
        //         'Laptop Dell XPS'
        //     ],
        //     title2: 'Sản phẩm',
        //     recommendations2: [
        //         {
        //             img: logo,
        //             name: 'Dell Precision 5550',
        //             price: '21990000',
        //         },
        //         {
        //             img: logo,
        //             name: 'Dell Latitude 9420',
        //             price: '17690000',
        //         },
        //         {
        //             img: logo,
        //             name: 'Dell Inspiron 16 5625',
        //             price: '14390000',
        //         },
        //         {
        //             img: logo,
        //             name: 'Dell Gaming G15 5530',
        //             price: '33990000',
        //         }
        //     ]
        // }
    ]
    return (
        <header className="flex justify-center px-5 border-b bg-white shrink-0 ">
            <div className="flex flex-col lg:max-w-4xl w-full">
                <div className="flex flex-nowrap w-full items-center align-center justify-between py-4 gap-2">
                    <div className="flex items-center align-center gap-3 w-fit shrink-0">
                        <AutoComplete
                            style={{ width: 200 }}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                        >
                            <Input
                                placeholder="Tên sản phẩm, nhu cầu, hãng"
                                size="small"
                                prefix={
                                    <AiOutlineSearch className="font-bold text-primary text-base m-0 p-0" />
                                }
                                className="flex px-2.5 py-1 bg-secondary/[.2] border-primary border-0 focus:border rounded-full items-center align-center w-10 sm:w-36 md:w-64 lg:w-72 text-xs font-medium search"
                                allowClear
                                autoComplete="off"
                            />
                        </AutoComplete>

                    </div>
                </div>
                <div>
                    <SearchItems data={items[0]} />
                    {/* {items.map((item) => {
                    return <SearchItems data={item} />
                })} */}
                </div>
            </div>
        </header>
    )
}
