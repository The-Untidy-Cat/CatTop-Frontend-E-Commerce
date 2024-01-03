import { DefaultLayout } from "@/components/Layout";
import { ProfileLayout } from "@/components/Layout/Profile";
import OrderDetailView from "@/components/Order/detail";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { MobileView } from "react-device-detect";
import { FaChevronLeft } from "react-icons/fa";

export default function OrderDetailPage({ data }) {
  const router = useRouter();

  return (
    <PrivateWrapper>
      <DefaultLayout data={data}>
        <MobileView>
          <Link
            href="/user/orders"
            className="flex items-center gap-1 font-semibold py-2"
          >
            <FaChevronLeft /> Danh sách đơn hàng
          </Link>
        </MobileView>
        <ProfileLayout activeKey={"my-order"}>
          <OrderDetailView />
        </ProfileLayout>
      </DefaultLayout>
    </PrivateWrapper>
  );
}

export async function getServerSideProps() {
  try {
    const [brands, newProducts] = await Promise.all([
      await Axios.get("/web/brands"),
      await Axios.get("/web/search?limit=10&order_by=created_at&order=desc"),
    ]);
    return {
      props: {
        data: {
          brands: brands.data.data || [],
          newProducts: newProducts?.data?.data?.records || [],
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          brands: [],
          newProducts: [],
        },
      },
    };
  }
}
