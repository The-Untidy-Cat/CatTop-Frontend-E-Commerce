import { DefaultLayout } from "@/components/Layout";
import { ProductList } from "@/components/Product/display";
import { Axios } from "@/utils/axios";

export default function SearchPage({ data }) {
  return (
    <DefaultLayout data={data} title={`Kết quả tìm kiếm ${data.keyword || ""}`}>
      <ProductList data={data} />
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const [brands, newProducts] = await Promise.all([
    await Axios.get("/web/brands"),
    await Axios.get("/web/search?limit=10&order_by=created_at&order=desc"),
  ]);

  return {
    props: {
      data: {
        filter: {
          brand: query?.brand || null,
          price: query?.price || null,
          order_by: query?.order_by || null,
          order: ["asc", "desc"].includes(query?.order) ? query?.order : null,
        },
        keyword: query?.name || null,
        brands: brands.data.data || [],
        // searchResult: searchResult?.data?.data || {},
        newProducts: newProducts?.data?.data?.records || [],
      },
    },
  };
}
