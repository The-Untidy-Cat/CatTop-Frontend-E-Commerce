import Image from "next/image";
import cat from "@/public/logo.png";
export default function GuaranteePolicy() {
    return (
        <div className="my-5 mx-20 text-base flex flex-col gap-2">
            <p className="font-bold text-3xl">Chính sách bảo hành</p>
            <hr />
            {/* Bảo hành */}
            <div>
                <p className="font-semibold text-2xl mb-4">Bảo hành laptop</p>
                <p className="leading-loose">
                    Tất cả các sản phẩm do CatTop bán ra đều được tuân thủ điều kiện bảo hành của nhà cung cấp, hãng sản xuất. Các trường hợp sau đây bị coi là vi phạm điều kiện bảo hành và không được bảo hành:
                    <ul className="list-disc leading-loose ml-8">

                        <li>Sản phẩm bị tiêu hao trong quá trình sử dụng (Giới hạn độ bền của SSD, ăn mòn bàn phím, những tác động kèm theo từ môi trường bên ngoài, …).</li>

                        <li>Các phần mềm được cung cấp kèm theo máy.</li>

                        <li>Sản phẩm hết thời hạn bảo hành (thời hạn bảo hành sản phẩm được ghi trên tem hoặc kiểm tra theo serial của sản phẩm tại website thinkpro.vn, …)</li>

                        <li>Không có tem bảo hành của Công ty/nhà phân phối/hãng sản xuất hoặc có nhưng tem bảo hành đó không hợp lệ (bị rách, bị tẩy xoá, sửa chữa, mờ không đọc được, bong/tróc, …).</li>

                        <li>Số serial, mã vạch, thông số kỹ thuật trên sản phẩm không hợp lệ (bị mờ không đọc được, bị cạo, bị sửa, bị rách, bị bong/tróc, bị thay đổi).</li>

                        <li>Sản phẩm bị lỗi do nguyên nhân bất khả kháng (lũ lụt, hoả hoạn, nguồn điện không bình thường, sai điện áp quy định …).</li>

                        <li>Sản phẩm bị lỗi hình thức, biến dạng vật lý do bị rơi, va đập, vận chuyển/lắp đặt sai quy cách, hư hỏng do chuột bọ hoặc côn trùng xâm nhập, sản phẩm bị mốc, bị hoen rỉ, ẩm ướt, bị biến dạng như: trầy, xước, lồi, lõm, móp méo, ố vàng, mờ chữ, nứt, vỡ, viết chữ không tẩy được...</li>

                        <li>Sản phẩm tự ý tháo dỡ, sửa chữa bởi các cá nhân hoặc kỹ thuật viên không được sự ủy quyền của ThinkPro .</li>
                    </ul>
                </p>
            </div>
            {/* Thời gian */}
            <div>
                <p className="font-semibold text-2xl mb-4">Thời gian nhận bảo hành và trả bảo hành</p>
                <ul className="list-disc leading-loose ml-8">
                    <li>
                        Thời gian nhận bảo hành: Từ 9h00-12h30 và từ 14h00-18h00 tất cả các ngày trong tuần, từ thứ Hai đến Chủ nhật.
                    </li>
                    
                    <li>
                        Thời gian trả bảo hành: Từ 9h00-12h30 và từ 14h00-18h00 tất cả các ngày trong tuần, từ thứ Hai đến Chủ nhật.
                    </li>
                    
                    <li>
                        Hỗ trợ khách hàng bảo hành: Trong thời gian bảo hành sản phẩm nếu phát sinh vấn đề bảo hành kéo dài thời gian cửa hàng sẽ hỗ trợ cung cấp cho Quý khách sản phẩm để sử dụng tạm thời trong thời gian chờ bảo hành (Hoặc khi khách có yêu cầu mượn sản phẩm).
                    </li>
                </ul>
            </div>
        </div>
    )
}