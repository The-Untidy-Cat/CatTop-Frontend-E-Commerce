import Image from "next/image";
import cat from "@/public/logo.png";
export default function ReturnPolicy() {
    return (
        <div className="my-5 mx-20 text-base flex flex-col gap-2">
            <p className="font-bold text-3xl">Chính sách đổi trả</p>
            <hr />
            {/* Đổi trả laptop chính hãng */}
            <div>
                <p className="font-bold text-2xl mb-4">Điều kiện để đổi trả sản phẩm</p>
                <p className="leading-loose">
                    <ul className="list-decimal leading-loose ml-5">
                        <li className="font-semibold underline underline-offset-1">Đối với sản phẩm lỗi do Nhà sản xuất</li>
                        <ul className="list-disc ml-3">
                            <li>Yêu cầu đổi trả hàng cùng với Sản Phẩm dự kiến đổi trả phải gửi đến CatTop cùng với các tài liệu kèm theo <span className="font-semibold">trong vòng mười (10) ngày</span> kể từ ngày Quý khách nhận hàng từ CatTop (“Thời Hạn Đổi Trả”). </li>
                            <li>Sản Phẩm của Quý khách phải đảm bảo còn mới, giữ nguyên 100% tình trạng như ban đầu như khi Quý khách nhận Sản Phẩm từ CatTop, không có dấu hiệu bị va chạm/ vào nước, không bị cấn móp, trầy xước ….</li>
                            <li>Sản Phẩm dự kiến đổi trả khi gửi đến CatTop phải được đóng gói cùng với các phụ kiện, tài liệu hướng dẫn, thẻ bảo hành và hàng tặng kèm (nếu có)… vào thùng / hộp đựng sản phẩm của nhà sản xuất, giống như tình trạng ban đầu khi Quý khách nhận hàng. Bao bì thùng hộp chứa đựng sản phẩm phải nguyên vẹn không được móp, méo hay trầy xước, ẩm ướt, rách…</li>
                            <li>Sản phẩm lỗi do Nhà sản xuất là sản phẩm bị lỗi phần cứng và có biên bản xác nhận lỗi của hãng/ Nhà sản xuất, thời gian thẩm định từ 3-5 ngày (không tính thứ 7, Chủ nhật và ngày lễ)</li>
                        </ul>

                        <li className="font-semibold underline underline-offset-1">Đối với sản phẩm hư hỏng do vận chuyển</li>
                        <ul className="list-disc ml-3">
                            <li>Yêu cầu đổi trả hàng cùng với Sản Phẩm dự kiến đổi trả phải gửi đến CatTop cùng với các tài liệu kèm theo trong vòng mười (10) ngày kể từ ngày Quý khách nhận hàng từ CatTop.</li>
                            <li>Quý khách vui lòng cung cấp hình ảnh cụ thể về tình trạng hàng hóa, hộp, video mở hộp để CatTop kiểm tra.</li>
                            <li>Sản Phẩm dự kiến đổi trả khi gửi đến CatTop phải được đóng gói cùng với các phụ kiện, tài liệu hướng dẫn, thẻ bảo hành và hàng tặng kèm (nếu có)… vào thùng / hộp đựng sản phẩm của nhà sản xuất, giống như tình trạng ban đầu khi Quý khách nhận hàng.</li>
                        </ul>

                        <li className="font-semibold underline underline-offset-1">Đối với sản phẩm giao sai hoặc thông tin sản phẩm không đúng với mô tả trên web </li>
                        <ul className="list-disc ml-3">
                            <li>Yêu cầu đổi trả hàng cùng với Sản Phẩm dự kiến đổi trả phải gửi đến CatTop cùng với các tài liệu kèm theo trong vòng mười (10) ngày kể từ ngày Quý khách nhận hàng từ CatTop. Quá Thời Hạn Đổi Trả, CatTop có quyền từ chối hỗ trợ yêu cầu đổi trả trong trường hợp này.</li>
                            <li>Sản Phẩm của Quý khách phải đảm bảo còn mới, giữ nguyên 100% tình trạng như ban đầu như khi Quý khách nhận Sản Phẩm từ CatTop, không có dấu hiệu bị va chạm/ vào nước, không bị cấn móp, trầy xước ….</li>
                            <li>Sản Phẩm dự kiến đổi trả khi gửi đến CatTop phải được đóng gói cùng với các phụ kiện, tài liệu hướng dẫn, thẻ bảo hành và hàng tặng kèm (nếu có)… vào thùng / hộp đựng sản phẩm của nhà sản xuất, giống như tình trạng ban đầu khi Quý khách nhận hàng. Bao bì thùng hộp chứa đựng sản phẩm phải nguyên vẹn không được móp, méo hay trầy xước, ẩm ướt, rách…</li>
                        </ul>
                    </ul>
                </p>

            </div>
            {/* Trường hợp ko đc đổi trả */}
            <div>
                <p className="font-bold text-2xl mb-4">Những trường hợp không được đổi / trả hàng</p>
                <p className="leading-loose">
                    <ul className="list-disc leading-loose ml-8">
                        <li>Máy tính bàn được lắp ráp theo yêu cầu, không áp dụng đổi trả nguyên bộ, chỉ áp dụng đổi trả theo linh kiện.</li>
                        <li>Không áp dụng đổi trả đối với sản phẩm bị lỗi phần mềm, chỉ hỗ trợ xử lý khắc phục.</li>
                        <li>Sản Phẩm thanh lý, sản phẩm trưng bày hoặc thuộc chương trình giải phóng hàng tồn kho, bỏ mẫu.</li>
                        <li>Sản phẩm lỗi do người sử dụng: sản phẩm bị lỗi phát sinh trong quá trình sử dụng do người sử dụng, ví dụ: Sản phẩm bị cấn móp do rơi rớt, va chạm, sản phẩm bị vào nước, sử dụng không đúng hướng dẫn của nhà sản xuất …</li>
                        <li>Sản phẩm không được đổi/trả theo quy định của Nhà sản xuất.</li>
                        <li>Mất hộp, rách hộp, vỏ hộp móp méo, mất phụ kiện</li>
                        <li>Các sản phẩm thuộc “Danh sách sản phẩm không được áp dụng đổi trả, chỉ được bảo hành theo chính sách hãng”</li>

                    </ul>
                </p>

            </div>
        </div>
    )
}