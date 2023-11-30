import Cart from "@/components/Cart/cart";
import { DefaultLayout } from "@/components/Layout";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CartPage({ data }) {
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    router.push(
      {
        pathname: "/checkouts",
        query: {},
      },
      undefined,
      { shallow: true }
    );
  }, []);
  return (
    <PrivateWrapper>
      <DefaultLayout data={data}>{/* <Cart /> */}</DefaultLayout>
    </PrivateWrapper>
  );
}

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const promiseArr = [
      await Axios.get("/web/brands"),
      await Axios.get("/web/search?limit=10&order_by=created_at&order=desc"),
    ];
    if (query?.variant_id) {
      promiseArr.push(await Axios.get(`/web/variants/${query?.variant_id}`));
    }
    const data = await Promise.all(promiseArr);
    return {
      props: {
        data: {
          brands: data[0]?.data?.data || [],
          newProducts: data[1]?.data?.data?.records || [],
          item: {
            variant: data[2]?.data?.data || {},
            amount: query?.amount || 1,
          },
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
          item: {
            variant: {},
            amount: 1,
          },
        },
      },
    };
  }
}
