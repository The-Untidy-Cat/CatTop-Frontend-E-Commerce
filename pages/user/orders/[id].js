import { DefaultLayout } from "@/components/Layout";
import { ProfileLayout } from "@/components/Layout/Profile";
import OrderView from "@/components/Order/display";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";

export default function OrderDetailPage({ data }) {
  return (
    <PrivateWrapper>
      <DefaultLayout data={data}>
        <ProfileLayout activeKey={"my-order"}>
          <OrderView />
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
