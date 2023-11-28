// import Modal from 'react-modal';
// import { useState } from 'react'
// import { Cascader, Checkbox, Input, Select, Space } from 'antd';
// export default function Booking() {
//     const { Option } = Select;
//     const selectProvince = (
//         <Select defaultValue="" className='pl-2'>
//             <Option className="bg-white hover:bg-secondary font-medium" value="">Tỉnh A</Option>
//             <Option className="bg-white hover:bg-secondary font-medium" value="">Tỉnh B</Option>
//         </Select>
//     );
//     const selectDistrict = (
//         <Select defaultValue="" className='pl-2'>
//             <Option className="bg-white hover:bg-secondary font-medium " value="">Huyện A</Option>
//             <Option className="bg-white hover:bg-secondary font-medium" value="">Huyện B</Option>
//         </Select>
//     );
//     const selectWard = (
//         <Select defaultValue="" className='pl-2'>
//             <Option className="bg-white hover:bg-secondary font-medium" value="">Xã A</Option>
//             <Option className="bg-white hover:bg-secondary font-medium" value="">Xã B</Option>
//         </Select>
//     );
//     const [address, setAddress] = useState(false);
//     const openAdd = () => {
//         setAddress(true)
//         setChange(false)
//     }
//     const closeAdd = () => {
//         setAddress(false)
//     }
//     const [changeAdd, setChange] = useState(false);
//     const openChange = () => {
//         setChange(true)
//     }
//     const closeChange = () => {
//         setChange(false)
//         setAddress(true)
//     }
//     return (
//         <div className='flex flex-col bg-slate-100 w-full h-full gap-2'>
//             <div className="flex flex-col bg-white p-2 gap-2 rounded">
//                 <p>Địa chỉ nhận hàng</p>
//                 <div className="flex py-2 px-4 ">
//                     <div className=' w-2/12'>
//                         <p>Tên</p>
//                         <p>Số điện thoại</p>
//                     </div>
//                     <div className=' w-5/12'>
//                         <p>Số nhà, Đường</p>
//                         <p>Thành phố/Tỉnh</p>
//                     </div>
//                     <div className=''>
//                         <a onClick={openAdd}>Thay đổi</a>
//                         <Modal
//                             isOpen={address}
//                             onRequestClose={closeAdd}
//                             contentLabel="Example Modal"
//                             className="h-full bg-transparent flex justify-center items-center"
//                         >
//                             <div className='flex flex-col bg-white border w-5/12 h-auto lg:w-[500px] lg:h-[500px] px-4 py-3 gap-3 overflow-y-auto rounded-lg'>
//                                 <div className='flex justify-between border-b pb-2'>
//                                     <p className='text-lg font-semibold text-center w-full'>Thay đổi địa chỉ</p>
//                                     {/* <button className='text-lg font-semibold' onClick={closeAdd}>X</button> */}
//                                 </div>
//                                 <div className='grid grid-cols-1 gap-3'>
//                                     <div className='flex border-b justify-between'>
//                                         <div className='text-base'>Địa chỉ 1</div>
//                                         <a className='text-base text-primary' onClick={openChange}>Thay đổi</a>
//                                     </div>
//                                     <div>
//                                         <button className='border p-2 rounded bg-primary text-white' onClick={openChange}> + Thêm địa chỉ mới</button>
//                                         <Modal
//                                             isOpen={changeAdd}
//                                             onRequestClose={closeChange}
//                                             contentLabel="Example Modal"
//                                             className="h-full bg-transparent flex justify-center items-center"
//                                         >
//                                             <div className='flex flex-col border w-[400px] h-auto bg-white p-4 overflow-y-auto rounded-lg gap-4'>
//                                                 <div className='flex justify-between border-b pb-2'>
//                                                     <p className='text-lg font-semibold text-center w-full'>Thêm địa chỉ</p>
//                                                 </div>
//                                                 <div className="flex flex-col gap-4">
//                                                     <div>
//                                                         <Space direction="vertical" className=''>
//                                                             <Input
//                                                                 addonAfter={selectProvince}
//                                                                 placeholder='Tỉnh'
//                                                             />
//                                                         </Space>
//                                                     </div>
//                                                     <div>
//                                                         <Space direction="vertical">
//                                                             <Input
//                                                                 addonAfter={selectDistrict}
//                                                                 placeholder='Huyện'
//                                                             />
//                                                         </Space>
//                                                     </div>
//                                                     <div>
//                                                         <Space direction="vertical">
//                                                             <Input
//                                                                 addonAfter={selectWard}
//                                                                 placeholder='Xã'
//                                                             />
//                                                         </Space>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <Input placeholder='Số nhà, đường'></Input>
//                                                 </div>
//                                                 <div>
//                                                     <Checkbox>Đặt làm mặc định</Checkbox>
//                                                 </div>
//                                                 <div className='flex gap-2 justify-end border-t pt-2'>
//                                                     <button className='border p-2 rounded w-auto bg-secondary/[.3]' onClick={closeChange}>Trở lại</button>
//                                                     <button className='border p-2 rounded w-auto bg-primary text-white'>Xác nhận</button>
//                                                 </div>

//                                             </div>
//                                         </Modal>
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-2 justify-end border-t pt-2'>
//                                     <button className='border p-2 rounded w-3/12 bg-secondary/[.3]' onClick={closeAdd}>Trở lại</button>
//                                     <button className='border p-2 rounded w-3/12 bg-primary text-white'>Xác nhận</button>
//                                 </div>
//                             </div>
//                         </Modal>
//                     </div>
//                 </div>
//             </div>
//             <div className='rounded bg-white p-2 grid grid-cols-4'>
//                 <p className='text-slate-400'>Sản phẩm</p>
//                 <p className='text-slate-400'>Đơn giá</p>
//                 <p className='text-slate-400'>Số lượng</p>
//                 <p className='text-slate-400'>Thành tiền</p>
//             </div>
//             <div className='rounded bg-white p-2'>
                
//             </div>
//             <div>Tổng bill</div>
//         </div>
//     );
// }