import Image from "next/image";
import cat from "@/public/logo.png";
export default function PurchasePolicy() {
    return (
        <div className="my-5 mx-20 text-base flex flex-col gap-2">
            <p className="font-bold text-3xl">Chính sách mua hàng</p>
            <hr />
            <div>
                <ul className="list-decimal ml-5 leading-loose">
                    <li className="font-semibold">Chất Lượng và Thông Tin Sản Phẩm</li>
                    <p className="text-justify">CatTop cam kết cung cấp các sản phẩm laptop chất lượng cao và chính hãng. Mọi thông tin chi tiết, tính năng kỹ thuật, và hình ảnh sản phẩm đều được hiển thị một cách rõ ràng trên trang web của chúng tôi. Quý khách được khuyến khích đọc kỹ thông tin sản phẩm trước khi quyết định mua hàng.</p>

                    <li className="font-semibold">Giá Cả và Thanh Toán</li>
                    <p className="text-justify">Giá cả của sản phẩm được hiển thị trực tiếp và minh bạch trên trang web của CatTop. Chúng tôi cam kết không có chi phí phát sinh, và giá cả được cập nhật đều đặn. Quý khách có thể thanh toán thông qua các phương thức thanh toán trực tuyến an toàn mà chúng tôi hỗ trợ. Đối với mua hàng trực tiếp tại cửa hàng, chúng tôi cũng chấp nhận thanh toán bằng tiền mặt hoặc thẻ tín dụng.</p>

                    <li className="font-semibold">Giao Hàng và Nhận Hàng</li>
                    <ul className="list-disc ml-4">
                        <li className="text-justify"><span className="italic">Giao Hàng Online:</span> Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và đáng tin cậy cho các đơn đặt hàng trực tuyến. Quý khách sẽ nhận được thông tin vận chuyển để theo dõi đơn hàng của mình</li>
                        <li className="text-justify"><span className="italic">Giao Hàng Offline:</span> Đối với mua trực tiếp tại cửa hàng, quý khách có thể nhận sản phẩm ngay tại cửa hàng sau khi thanh toán.</li>
                        <li className="text-justify"><span className="italic">Kiểm Tra Hàng:</span> Quý khách vui lòng kiểm tra sản phẩm ngay sau khi nhận hàng. Nếu có vấn đề gì liên quan đến chất lượng hoặc thiết kế, vui lòng liên hệ với chúng tôi ngay lập tức để được hỗ trợ.</li>
                    </ul>

                    <li className="font-semibold">Đổi Trả và Hoàn Tiền</li>
                    <p className="text-justify">
                        Chúng tôi chấp nhận quy đổi trả hàng trong thời gian nhất định và dưới các điều kiện nhất định. Quý khách vui lòng đọc kỹ chính sách đổi trả trên trang web của chúng tôi hoặc liên hệ với bộ phận chăm sóc khách hàng để biết thêm thông tin chi tiết.
                    </p>

                    <li className="font-semibold">Bảo Hành và Hỗ Trợ Khách Hàng</li>
                    <p className="text-justify">
                        Sản phẩm laptop của chúng tôi được hỗ trợ bảo hành từ các nhà sản xuất uy tín. Quý khách vui lòng đọc kỹ điều kiện bảo hành và liên hệ với bộ phận hỗ trợ khách hàng nếu có bất kỳ vấn đề gì liên quan đến bảo hành hoặc sử dụng sản phẩm.
                    </p>
                </ul>
            </div>
        </div>
    )
}