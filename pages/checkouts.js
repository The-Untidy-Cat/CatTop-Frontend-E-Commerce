import Cart from "@/components/Cart/cart";
import { DefaultLayout } from "@/components/Layout";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";

export default function CartPage({ data }) {
  console.log(data);
  return (
    <PrivateWrapper>
      <DefaultLayout data={data}>
        <Cart />
      </DefaultLayout>
    </PrivateWrapper>
  );
}

export async function getServerSideProps(context) {
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