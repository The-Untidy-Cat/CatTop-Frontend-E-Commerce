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
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";

const BrandsFilter = ({ data, onChange }) => {
  const router = useRouter();
  const handleChange = () => {
    const brand = form.getFieldValue("brand");
    onChange && onChange();
    router.push({
      query: {
        ...router.query,
        brand: brand || undefined,
      },
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      brand: router.query?.brand,
    });
  }, [router]);
  return (
    <Form
      className="flex flex-wrap gap-1 items-center align-center m-0"
      form={form}
      onFieldsChange={handleChange}
    >
      <Form.Item name="brand" className="m-0">
        <Radio.Group className="grid grid-cols-2 gap-1.5">
          {data?.brands?.map((brand) => (
            <Radio value={brand.name} key={brand.name}>
              {brand.name}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
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
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = isMobile ? 6 : 8;
  const router = useRouter();

  const handleCloseTag = (param, value) => {
    switch (param) {
      case "brand":
        let replacedBrand = data?.filter?.brand
          ?.split(",")
          ?.filter((brand) => brand !== value);
        setLoadingFilter(true);
        router.push({
          query: {
            ...router.query,
            brand: replacedBrand?.length > 0 ? replacedBrand?.join(",") : null,
          },
        });
        break;
      case "price":
        setLoadingFilter(true);
        router.push({
          query: {
            ...router.query,
            price: undefined,
          },
        });
        break;
    }
  };

  const getProducts = async (renew = false) => {
    const { query } = router;
    const selectedPrice = PRICE_LIST.find((item) => item.key == query?.price);
    searchProduct({
      name: query?.name,
      brand: query?.brand,
      min_price: selectedPrice?.min_price,
      max_price: selectedPrice?.max_price,
      order_by: query?.order_by,
      order: ["asc", "desc"].includes(query?.order) ? query?.order : undefined,
      limit: limit,
      offset: renew ? 0 : offset,
    })
      .then((response) => {
        setItems((prev) => [...prev, ...response?.data?.records]);
        setTotal(response?.data?.length);
        setOffset(response?.data?.offset + limit);
      })
      .finally(() => {
        // setLoading(false);
        setLoadingFilter(false);
      });
  };

  useEffect(() => {
    setItems([]);
    setTotal(0);
    setOffset(0);
    getProducts(true);
  }, [data]);

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
          loading={loadingFilter}
          paragraph={{
            rows: 4,
          }}
          title={false}
          active
        >
          <p className="text-sm m-0">
            Tìm thấy <span className="font-medium">{total}</span> sản phẩm
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
                <BrandsFilter
                  data={data}
                  onChange={() => {
                    setLoadingFilter(true);
                    // setItems([]);
                    // setOffset(0);
                    // setTotal(0);
                  }}
                />
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
                <PriceFilter
                  data={data}
                  onChange={() => {
                    setLoadingFilter(true);
                    // setItems([]);
                    // setOffset(0);
                    // setTotal(0);
                  }}
                />
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
      <InfiniteScroll
        dataLength={total || 99}
        loader={
          <Skeleton
            loading={true}
            title={false}
            paragraph={{
              rows: 9,
            }}
            className="flex flex-col w-full h-full min-h-full gap-2 bg-white rounded-lg p-4"
          >
            <div className="flex flex-col w-full h-full min-h-full bg-white rounded-lg p-4"></div>
          </Skeleton>
        }
        next={getProducts}
        hasMore={offset < total}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {items?.map((product) => (
          <ProductItems data={product} key={product?.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
});

export { ProductList };
