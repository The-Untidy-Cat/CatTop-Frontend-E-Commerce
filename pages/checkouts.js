import Checkout from "@/components/Checkout";
import { DefaultLayout } from "@/components/Layout";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CheckoutsPage({ data }) {
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
      <DefaultLayout data={data}>
        {data?.item?.length > 0 ? (
          <Checkout cart={data?.item} type={data?.type} />
        ) : (
          <Empty description="Không có sản phẩm nào trong giỏ hàng" />
        )}
      </DefaultLayout>
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
    } else
      promiseArr.push(
        await Axios.get("/customer/cart", {
          headers: {
            Cookie: context.req.headers.cookie,
            Origin: process.env.NEXT_PUBLIC_CLIENT_URL,
            Referer: process.env.NEXT_PUBLIC_CLIENT_URL,
          },
        })
      );
    const data = await Promise.all(promiseArr);
    return {
      props: {
        data: {
          brands: data[0]?.data?.data || [],
          newProducts: data[1]?.data?.data?.records || [],
          type: query?.variant_id ? "variant" : "cart",
          type: query?.variant_id ? "variant" : "cart",
          item: query?.variant_id
            ? [
                {
                  variant: data[2]?.data?.data || {},
                  amount: query?.amount || 1,
                  total:
                    data[2]?.data?.data?.sale_price * query?.amount ||
                    data[2]?.data?.data?.sale_price,
                },
              ]
            : data[2]?.data?.data?.cart || null,
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
          item: null,
        },
      },
    };
  }
}
