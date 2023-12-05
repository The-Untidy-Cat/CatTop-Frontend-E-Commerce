import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Menu,
  Dropdown,
  Button,
  Checkbox,
  Radio,
  Spin,
  Form,
  Skeleton,
  Popover,
  Empty,
  Tag,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import logo from "@/public/uit.png";
import ProductItems from "./items";
import { searchProduct } from "@/services/search";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import { PRICE_LIST } from "@/app.config";
import { FaChevronDown } from "react-icons/fa";

const items = [
  {
    name: "Dell Inspiron 14 5430",
    img: logo,
    price: "20790000",
    color: ["#FFFF"],
    specification: {
      cpu: "AMD 7000, 8 Cores",
      ram: "16GB, 4800Mhz",
      storage: "SSD 512GB",
      screen: "16, 2560 x 1600, 60Hz",
      card: "AMD Radeon 680M",
    },
  },
  {
    name: "Dell Inspiron 15 3520",
    img: logo,
    price: "12990000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1235U, 10 Cores",
      ram: "16GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "15.6, 1920 x 1080, 60Hz",
      card: "Intel Iris Xe Graphics",
    },
  },
  {
    name: "Dell Inspiron 14 5425",
    img: logo,
    price: "14790000",
    color: ["#FFFF"],
    specification: {
      cpu: "Ryzen 5 5625U, 6 Cores",
      ram: "16GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "14, 2240 x 1400, 60Hz",
      card: "AMD Radeon Graphics",
    },
  },
  {
    name: "ASUS Zenbook 14 OLED",
    img: logo,
    price: "17390000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1240P, 12 Cores",
      ram: "16GB, Mhz",
      storage: "SSD 512GB",
      screen: "14, 2880 x 1800, 60Hz",
      card: "Intel Iris Xe",
    },
  },
  {
    name: "HP Pavilion 14 x360 2022",
    img: logo,
    price: "13490000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1235U, 6 Cores",
      ram: "8GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "14, 1920 x 1080, 60Hz",
      card: "Intel UHD Graphics",
    },
  },
  {
    name: "Dell Inspiron 14 5430",
    img: logo,
    price: "20790000",
    color: ["#FFFF"],
    specification: {
      cpu: "AMD 7000, 8 Cores",
      ram: "16GB, 4800Mhz",
      storage: "SSD 512GB",
      screen: "16, 2560 x 1600, 60Hz",
      card: "AMD Radeon 680M",
    },
  },
  {
    name: "Dell Inspiron 15 3520",
    img: logo,
    price: "12990000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1235U, 10 Cores",
      ram: "16GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "15.6, 1920 x 1080, 60Hz",
      card: "Intel Iris Xe Graphics",
    },
  },
  {
    name: "Dell Inspiron 14 5425",
    img: logo,
    price: "14790000",
    color: ["#FFFF"],
    specification: {
      cpu: "Ryzen 5 5625U, 6 Cores",
      ram: "16GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "14, 2240 x 1400, 60Hz",
      card: "AMD Radeon Graphics",
    },
  },
  {
    name: "ASUS Zenbook 14 OLED",
    img: logo,
    price: "17390000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1240P, 12 Cores",
      ram: "16GB, Mhz",
      storage: "SSD 512GB",
      screen: "14, 2880 x 1800, 60Hz",
      card: "Intel Iris Xe",
    },
  },
  {
    name: "HP Pavilion 14 x360 2022",
    img: logo,
    price: "13490000",
    color: ["#FFFF"],
    specification: {
      cpu: "Core i5 1235U, 6 Cores",
      ram: "8GB, 3200Mhz",
      storage: "SSD 512GB",
      screen: "14, 1920 x 1080, 60Hz",
      card: "Intel UHD Graphics",
    },
  },
];

const BrandsFilter = ({ data, onChange }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const handleCheckAll = () => {
    form.setFieldsValue({
      brand: data?.brands?.map((brand) => brand.name),
    });
    onChange && onChange();
    router.push({
      query: {
        ...router.query,
        brand: undefined
      },
    });
  };
  const handleChange = () => {
    const brand = form.getFieldValue("brand");
    router.push({
      query: {
        ...router.query,
        brand: brand?.length > 0 ? brand?.join(",") : undefined,
      },
    });
    onChange && onChange();
  };
  useEffect(() => {
    form.setFieldsValue({
      brand: data?.filter?.brand?.split(",") || [],
    });
  }, [data]);
  return (
    <>
      <Button type="link" onClick={() => handleCheckAll()} className="p-0">
        Tất cả
      </Button>
      <Form
        className="flex flex-wrap gap-1 items-center align-center"
        form={form}
        onFieldsChange={handleChange}
      >
        <Form.Item name="brand">
          <Checkbox.Group className="grid grid-cols-2 gap-1.5">
            {data?.brands?.map((brand) => (
              <Checkbox value={brand.name} key={brand.name}>
                {brand.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </>
  );
};

const PriceFilter = ({ onChange }) => {
  const router = useRouter();
  const handleChange = () => {
    const price = form.getFieldValue("price");
    const selectedPrice = PRICE_LIST.find((item) => item.key == price);
    onChange && onChange();
    router.push({
      query: {
        ...router.query,
        price: selectedPrice?.key || undefined,
      },
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      price: router.query?.price,
    });
  }, [router]);
  return (
    <Form
      className="flex flex-wrap gap-1 items-center align-center m-0"
      form={form}
      onFieldsChange={handleChange}
    >
      <Form.Item name="price" className="m-0">
        <Radio.Group className="grid grid-cols-2 gap-1.5">
          {PRICE_LIST?.map((price) => (
            <Radio value={price.key} key={price.key}>
              {price.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

const ProductList = React.memo(function ProductList({ data }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const router = useRouter();

  const handleCloseTag = (param, value) => {
    setLoading(true);
    switch (param) {
      case "brand":
        let replacedBrand = data?.filter?.brand
          ?.split(",")
          ?.filter((brand) => brand !== value);
        router.push({
          query: {
            ...router.query,
            brand: replacedBrand?.length > 0 ? replacedBrand?.join(",") : null,
          },
        });
        break;
      case "price":
        router.push({
          query: {
            ...router.query,
            price: undefined,
          },
        });
        break;
    }
  };

  const getProducts = () => {
    setLoadingMore(true);
    const { query } = router;
    const limit = 4;
    const selectedPrice = PRICE_LIST.find((item) => item.key == query?.price);
    searchProduct({
      name: query?.name,
      brand: query?.brand,
      min_price: selectedPrice?.min_price,
      max_price: selectedPrice?.max_price,
      order_by: query?.order_by,
      order: ["asc", "desc"].includes(query?.order) ? query?.order : undefined,
      limit: limit,
      offset: (page - 1) * limit,
    })
      .then((newItems) => {
        setItems((prevItems) =>
          Array.from(new Set(prevItems.concat(newItems?.data?.records)))
        );
        setPage(newItems?.data?.offset / limit + 1);
        setTotal(newItems?.data?.length);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const loadMore = useCallback(() => {
    getProducts();
  }, [items]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && items?.length < total) {
        console.log("load more");
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setTotal(0);
    getProducts();
  }, [router]);

  return (
    <div className="flex flex-col gap-3 w-full h-fit">
      <div className="flex flex-col gap-2 bg-white p-5 rounded-lg">
        <h1 className="flex gap-1 text-lg font-semibold font-medium m-0">
          {data?.keyword ? (
            <>
              Kết quả tìm kiếm cho
              <span className="font-bold italic">{data?.keyword}</span>
            </>
          ) : (
            "Sản phẩm liên quan"
          )}
        </h1>
        <Skeleton
          loading={loading || loadingMore}
          paragraph={{
            rows: 4,
          }}
          title={false}
          active
        >
          <p className="text-sm m-0">
            Tìm thấy <span className="font-medium">{items?.length}</span> sản
            phẩm
          </p>
          <div className="border-0 border-t my-1 w-full"></div>
          <div className="flex flex-wrap items-center align-center justify-start gap-1">
            <p className="font-medium text-ms m-0">Lọc theo: </p>
            {data?.filter?.brand?.split(",")?.map((brand) => (
              <Tag
                key={`brand-${brand}`}
                closable={true}
                onClose={() => handleCloseTag("brand", brand)}
              >
                Thương hiệu: {brand}
              </Tag>
            ))}
            {data?.filter?.price &&
              PRICE_LIST.find((item) => item.key === data?.filter?.price) && (
                <Tag
                  key={`price-${data?.filter?.price}`}
                  closable={true}
                  onClose={() => handleCloseTag("price", data?.filter?.price)}
                >
                  Giá:{" "}
                  {
                    PRICE_LIST.find((item) => item.key === data?.filter?.price)
                      .label
                  }
                </Tag>
              )}
          </div>
          <div className="flex gap-2">
            <Popover
              content={
                <BrandsFilter data={data} onChange={() => setLoading(true)} />
              }
              trigger="click"
              placement="bottom"
              className="shadow-0"
            >
              <Button
                type="text"
                className="flex gap-1 p-3 items-center align-center text-xs font-medium bg-white rounded-lg border border-gray-300"
              >
                Thương hiệu <FaChevronDown className="text-xs" />
              </Button>
            </Popover>
            <Popover
              content={
                <PriceFilter data={data} onChange={() => setLoading(true)} />
              }
              trigger="click"
              placement="bottom"
              className="shadow-0"
            >
              <Button
                type="text"
                className="flex gap-1 p-3 items-center align-center text-xs font-medium bg-white rounded-lg border border-gray-300"
              >
                Khoảng giá <FaChevronDown className="text-xs" />
              </Button>
            </Popover>
          </div>
        </Skeleton>
      </div>
      {loading ? (
        <Spin spinning={true} className="m-auto" />
      ) : items?.length == 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-64">
          <Empty
            description={
              <p className="m-0 text-sm font-medium text-gray-600">
                Không có kết quả
              </p>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {items?.map((product) => (
            <ProductItems data={product} key={product?.id} />
          ))}
        </div>
      )}

      <div ref={loader} />
    </div>
  );
});

export { ProductList };
