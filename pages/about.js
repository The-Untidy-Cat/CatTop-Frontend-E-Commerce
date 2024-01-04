import Error from "@/components/Error";
import AboutUs from "@/components/AboutUs";
import GuaranteePolicy from "@/components/Guarantee";
import ReturnPolicy from "@/components/Return";
import PurchasePolicy from "@/components/Purchase";
import { DefaultLayout } from "@/components/Layout";
import { Axios } from "@/utils/axios";

export default function AboutUsPage({data}) {
  return (
    <DefaultLayout data={data} title="Giới thiệu - CatTop">
      <AboutUs />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
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
