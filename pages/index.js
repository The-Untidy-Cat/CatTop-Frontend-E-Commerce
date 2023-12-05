import { DefaultLayout } from "@/components/Layout";
import ProductItems from "@/components/Product/items";
import { getAllBrand } from "@/services/brand";
import { searchProduct } from "@/services/search";
import { Axios } from "@/utils/axios";
import { Image, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const handleGetAllBrand = async () => {
    const { data } = await getAllBrand();
    setBrands(data);
    return true;
  };
  const handleGetNewProducts = async () => {
    const { data } = await searchProduct({
      order_by: "created_at",
      order: "desc",
      limit: 10,
    });
    setNewProducts(data.records);
    return true;
  };
  const handleData = async () => {
    setLoading(true);
    await Promise.all([handleGetAllBrand(), handleGetNewProducts()]);
    setLoading(false);
  };
  useEffect(() => {
    if (!data) handleData();
    else {
      setBrands(data.brands);
      setNewProducts(data.newProducts);
    }
  }, [data]);

  return (
    <DefaultLayout data={data}>
      <div className="flex flex-col gap-2 w-full h-fit">
        <div className="flex flex-col gap-2 w-full h-fit">
          <p className="m-0 text-lg font-semibold">Thương hiệu nổi bật</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 bg-white rounded-lg p-5">
            <Skeleton
              loading={loading}
              active
              paragraph={{ rows: 1 }}
              title={false}
            >
              {brands?.map((brand) => (
                <Link
                  href={`/products?brand=${brand.name}`}
                  className="flex flex-col items-center justify-center"
                  key={brand.name}
                >
                  <Image
                    src={brand.image}
                    className="w-24 h-24 object-contain"
                    alt={brand.name}
                    preview={false}
                  />
                  <p className="m-0 font-bold">{brand.name}</p>
                  <p className="m-0 text-xs text-gray-500">
                    {brand.product_count} sản phẩm
                  </p>
                </Link>
              ))}
            </Skeleton>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-fit">
          <p className="m-0 text-lg font-semibold">Sản phẩm mới</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-secondary/[.2] rounded-lg p-5">
            <Skeleton
              loading={loading}
              active
              paragraph={{ rows: 1 }}
              title={false}
            >
              {newProducts?.map((product) => {
                return <ProductItems data={product} key={product.id} />;
              })}
            </Skeleton>
          </div>
        </div>
      </div>
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
