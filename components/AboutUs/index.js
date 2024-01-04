import Image from "next/image";
import cat from "@/public/logo.png";
import tuananh from "@/public/profile/tuan_anh.jpg";
import minhngoc from "@/public/profile/minh_ngoc.jpg";
import phuonganh from "@/public/profile/phuong_anh.jpg";
import mychung from "@/public/profile/my_chung.jpg";

export default function AboutUs() {
  return (
    <div className="p-5 md: p-7 text-base flex flex-col gap-4 bg-white rounded-md">
      {/* Thành viên */}
      <div>
        <p className="text-center font-bold text-3xl mb-4">Các thành viên</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
          <div className="bg-primary/[.2] h-48 rounded-2xl flex flex-col items-center justify-center gap-1.5">
            <Image src={tuananh} className="w-20 h-20 rounded-full" />
            <p className="text-center">
              <strong>Nguyễn Tuấn Anh</strong><br/>
              <span className="text-sm">sheroanh</span>
            </p>
          </div>
          <div className="bg-primary/[.2] h-48 rounded-2xl flex flex-col items-center justify-center gap-1.5">
            <Image src={minhngoc} className="w-20 h-20 rounded-full" />
            <p className="text-center">
              <strong>Nguyễn Minh Ngọc</strong><br/>
              <span className="text-sm">whitie017</span>
            </p>
          </div>
          <div className="bg-primary/[.2] h-48 rounded-2xl flex flex-col items-center justify-center gap-1.5">
            <Image src={mychung} className="w-20 h-20 rounded-full" />
            <p className="text-center">
              <strong>Trịnh Thị Mỹ Chung</strong><br/>
              <span className="text-sm">ttmc1809</span>
            </p>
          </div>
          <div className="bg-primary/[.2] h-48 rounded-2xl flex flex-col items-center justify-center gap-1.5">
            <Image src={phuonganh} className="w-20 h-20 rounded-full" />
            <p className="text-center">
              <strong>Trần Phương Anh</strong><br/>
              <span className="text-sm">gracietran23</span>
            </p>
          </div>
        </div>
      </div>
      {/* Giới thiệu */}
      <div>
        <span className="font-bold text-3xl">Giới thiệu</span>
        <hr className="my-2" />
        <p className="text-justify leading-loose">
          CatTop là đơn vị tiên phong thay đổi mô hình bán lẻ và trải nghiệm
          công nghệ tại Việt Nam. Được thành lập vào năm 2023 bởi những sinh
          viên Gen Z đầy nhiệt huyết và đam mê công nghệ, với xuất phát điểm là
          số vốn ít ỏi 100 ngàn đồng cho một cửa hàng laptop nhỏ tại Khu Phố 6,
          Phường Linh Trung, TP Thủ Đức, cho đến nay The Untidy Cat đã phát
          triển và vận hành nhiều cửa hàng lớn nhỏ bán lẻ máy tính và phụ kiện
          công nghệ trên hai miền đất nước dưới thương hiệu CatTop, trở thành
          đơn vị tiên phong trong việc thay đổi mô hình bán lẻ và trải nghiệm
          công nghệ tại Việt Nam với chuỗi cửa hàng tiêu chuẩn mới - Dạo Bước
          Công Nghệ.
        </p>
      </div>
      {/* Tầm nhìn */}
      <div className="text-right">
        <span className="font-bold text-3xl">Tầm nhìn</span>
        <hr className="my-2" />
        <p className="leading-loose">
          Với 4 thành viên (tiếp tục mở rộng) tại Sài Gòn và 200% tăng trưởng
          doanh thu trong suốt 3 tháng liên tiếp, The Untidy Cat tự tin thực
          hiện tầm nhìn 2025 trở thành Top 5 nhà cung cấp máy tính tại thị
          trường Việt Nam
        </p>
      </div>
      {/* Sứ mệnh */}
      <div>
        <span className="font-bold text-3xl">Sứ mệnh</span>
        <hr className="my-2" />
        <p className="text-justify leading-loose">
          CatTop với sứ mệnh mang lại những giá trị tốt đẹp, luôn lấy khách hàng
          làm trung tâm, bằng kiến thức chuyên môn, sự chân thành và nhiệt huyết
          của tuổi trẻ, đồng thời ứng dụng công nghệ số để tối ưu và linh hoạt,
          mang lại trải nghiệm tốt nhất dành cho khách hàng qua từng dịch vụ mà
          công ty cung cấp.
        </p>
      </div>
      {/* Giá trị cốt lõi */}
      <div className="text-right">
        <span className="font-bold text-3xl">Giá trị cốt lõi</span>
        <hr className="my-2" />
        <p>
          Chuyên môn - Chân thành - Linh hoạt là những Giá trị cốt lõi mà CatTop
          sử dụng trong quá trình hình thành và phát triển
        </p>
        <div className="grid md:grid-cols-3 gap-4 justify-center mt-4">
          <div className="bg-primary/[.2] rounded-lg text-center py-3 px-3">
            <span className="font-semibold text-lg">Chân thành</span>
            <p className="leading-loose">
              CatTop luôn phục vụ khách hàng bằng tất cả sự chân thành và tin
              cậy. Liêm chính, Trung thực trong ứng xử và trong tất cả các giao
              dịch.
            </p>
          </div>
          <div className="bg-primary/[.2] rounded-lg text-center py-3 px-3">
            <span className="font-semibold text-lg">Chuyên môn</span>
            <p className="leading-loose">
              CatTop luôn sẵn sàng phục vụ quý khách hàng với đội ngũ chuyên
              viên tư vấn có chuyên môn, được đào tạo bài bản, có kiến chuyên
              sâu về sản phẩm, thấu hiểu nhu cầu của khách hàng.
            </p>
          </div>
          <div className="bg-primary/[.2] rounded-lg text-center py-3 px-3">
            <span className="font-semibold text-lg">Linh hoạt</span>
            <p className="leading-loose">
              Linh hoạt là giá trị quan trọng mà CatTop mang đến để vận hành và
              phục vụ khách hàng tốt nhất trong bối cảnh xã hội liên tục vận
              động hiện nay.
            </p>
          </div>
        </div>
      </div>
      {/* Kết */}
      <div>
        <p className="border-t border-dashed" />
        <p className="my-2 leading-loose">
          CatTop là hệ thống bán lẻ máy tính uy tín tại Việt Nam với chuỗi cửa
          hàng trải nghiệm độc đáo và đội ngũ tư vấn chuyên sâu, hình thức thanh
          toán đa dạng và bảo hành uy tín, tin cậy giúp khách hàng tự tin lựa
          chọn các sản phẩm công nghệ phù hợp nhất.
        </p>
      </div>
    </div>
  );
}
