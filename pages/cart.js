import Cart from "@/components/Cart/cart";
import { DefaultLayout } from "@/components/Layout";
import { useUser } from "@/components/Provider/AuthProvider";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";
import { useEffect } from "react";

export default function CartPage({ data }) {
  const { refreshCart } = useUser();
  console.log(data);
  useEffect(() => {
    refreshCart();
  }
  , []);
  return (
    <PrivateWrapper>
      <DefaultLayout data={data} 
      title="Giỏ hàng - CatTop"
      >
        <Cart />
      </DefaultLayout>
    </PrivateWrapper>
  );
}

export async function getStaticProps(context) {
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

