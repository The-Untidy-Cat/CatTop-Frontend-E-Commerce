import ProductDetail from "@/components/Product/detail";
import { DefaultLayout } from "@/components/Layout";
import { Axios } from "@/utils/axios";
import { useEffect } from "react";

export default function ProductDetailPage({ data }) {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <DefaultLayout
      data={data}
      title={data?.productDetail?.name}
      style={{
        paddingBottom: "100px",
      }}
    >
      <ProductDetail data={data?.productDetail} />
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;
    const [brands, newProducts, productDetail] = await Promise.all([
      await Axios.get("/web/brands"),
      await Axios.get("/web/search?limit=10&order_by=created_at&order=desc"),
      await Axios.get(`/web/products/${slug}`),
    ]);
    return {
      props: {
        data: {
          brands: brands.data.data || [],
          newProducts: newProducts?.data?.data?.records || [],
          productDetail: productDetail?.data?.data || {},
        },
      },
    };
  } catch (error) {
    console.log(error);
    context.res.statusCode = 404;
    return {
      redirect: {
        permanent: false,
        destination: "/products",
      },
      props: {
        data: {
          brands: [],
          newProducts: [],
          productDetail: {},
        },
      },
    };
  }
}
