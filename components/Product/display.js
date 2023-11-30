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

const BrandsFilter = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const handleCheckAll = () => {
    form.setFieldsValue({
      brand: data?.brands?.map((brand) => brand.name),
    });
    const { query } = router;
    router.push({
      query: {
        ...router.query,
      },
    });
  };
  const handleChange = () => {
    const { query } = router;
    const brand = form.getFieldValue("brand");
    router.push({
      query: {
        ...router.query,
        brand: brand?.length > 0 ? brand?.join(",") : undefined,
      },
    });
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

const PriceFilter = () => {
  const router = useRouter();
  const handleChange = () => {
    const { query } = router;
    const price = form.getFieldValue("price");
    const selectedPrice = PRICE_LIST.find((item) => item.key == price);
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

const ProductPage = () => {
  const options1 = [
    { label: "Dell", value: 1 },
    { label: "LG", value: 2 },
    { label: "Asus", value: 3 },
    { label: "Apple", value: 4 },
    { label: "Lenovo", value: 5 },
    { label: "Microsoft", value: 6 },
    { label: "HP", value: 7 },
    { label: "Acer", value: 8 },
  ];
  const handleCheckboxChange = (e) => {
    console.log(e);
  };

  const brands = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-2 gap-2">
          {options1.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];
  const options2 = [
    { label: "Văn phòng, học tập", value: 1 },
    { label: "Quay dựng Video", value: 2 },
    { label: "Gaming", value: 3 },
    { label: "2D Design", value: 4 },
    { label: "3D Design", value: 5 },
    { label: "Lập trình", value: 6 },
  ];

  const demands = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-2 gap-2">
          {options2.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const options3 = [
    { label: "Dưới 10 triệu", value: 1 },
    { label: "Từ 10 - 15 triệu", value: 2 },
    { label: "Từ 15 - 20 triệu", value: 3 },
    { label: "Từ 20 - 25 triệu", value: 4 },
    { label: "Từ 25 - 30 triệu", value: 5 },
    { label: "Từ 30 - 40 triệu", value: 6 },
    { label: "Trên 40 triệu", value: 7 },
  ];

  const prices = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-2 gap-2">
          {options3.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const options4 = [
    { label: "Chính hãng", value: 1 },
    { label: "Nhập khẩu", value: 2 },
  ];

  const sources = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-1 gap-2">
          {options4.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const options5 = [
    { label: "Mới, Sealed", value: 1 },
    { label: "Mới, Full box", value: 2 },
    { label: "Outlet", value: 3 },
    { label: "Đã qua sử dụng", value: 4 },
  ];

  const status = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-1 gap-2">
          {options5.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const options6 = [
    { label: "Trắng", value: 1 },
    { label: "Hồng", value: 2 },
    { label: "Đỏ", value: 3 },
    { label: "Xanh dương", value: 4 },
    { label: "Xanh lá", value: 5 },
    { label: "Đen", value: 6 },
    { label: "Xám", value: 7 },
    { label: "Vàng", value: 8 },
    { label: "Cam", value: 9 },
    { label: "Tím", value: 10 },
  ];
  const color = [
    {
      key: 1,
      label: (
        <Checkbox.Group className="grid grid-cols-2 gap-2">
          {options6.map((option) => (
            <Checkbox value={option.value}>{option.label}</Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];
  const optionsSX = [
    {
      key: 1,
      label: (
        <Radio.Group className="flex flex-col gap-2">
          <Radio value="popular">Nổi bật nhất</Radio>
          <Radio value="asc">Giá thấp - cao</Radio>
          <Radio value="desc">Giá cao - thấp</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <div className="bg-secondary/[.3] w-full h-max p-12 pt-6">
      <div className="bg-white rounded-2xl p-6">
        <p className="text-2xl font-semibold">Laptop</p>
        <p className="mt-2">
          Laptop là một thiết bị máy tính có kích thước nhỏ gọn và di động. Nó
          được thiết kế để sử dụng trong các hoạt động làm việc, giải trí hoặc
          học tập khi di chuyển mà không cần phải sử dụng những chiếc máy tính
          để bàn cồng kềnh.
        </p>
        <div className="border-b border-gray my-5"></div>
        <div className="flex space-x-3 overflow-x-auto ">
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Dell</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Lenovo</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">LG</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Microsoft</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Asus</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Apple</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">Acer</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">GIGABYTE</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">VAIO</a>
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-black text-xs bg-secondary/[.3]"
          >
            <a href="#">MSI</a>
          </Button>
        </div>
      </div>

      <div className="mt-8 flex space-x-3 overflow-x-auto">
        <Dropdown
          menu={{
            items: brands,
          }}
          className="h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Thương hiệu <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: demands,
          }}
          className="h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Nhu cầu <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: prices,
          }}
          className=" h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Khoảng giá <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: sources,
          }}
          className="h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Nguồn hàng <DownOutlined />
          </Button>
        </Dropdown>

        <Button className="bg-white border-white mr-3 h-10">
          <Checkbox>
            <span className="text-xs font-semibold">Có khuyến mãi</span>
          </Checkbox>
        </Button>
        <Dropdown
          menu={{
            items: status,
          }}
          className="h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Tình trạng <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: color,
          }}
          className="h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Màu sắc <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="mt-4">
        <Dropdown
          menu={{
            items: optionsSX,
          }}
          className="float-right h-10 border-white bg-white text-xs font-semibold"
        >
          <Button>
            Sắp xếp <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="mt-24 gap-4 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => {
          return <ProductItems data={item} />;
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          size="large"
          className="border-white bg-white w-96 text-base font-bold text-primary"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

const ProductList = React.memo(function ProductList({ data }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const router = useRouter();

  const handleCloseTag = (param, value) => {
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
    setLoading(true);
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
    }).then((newItems) => {
      setItems((prevItems) =>
        Array.from(new Set(prevItems.concat(newItems?.data?.records)))
      );
      setPage(newItems?.data?.offset / limit + 1);
      setTotal(newItems?.data?.length);
    });
    setLoading(false);
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
          loading={loading}
          paragraph={{
            rows: 1,
          }}
          title={false}
          active
        >
          <p className="text-sm m-0">
            Tìm thấy <span className="font-medium">{items?.length}</span> sản
            phẩm
          </p>
        </Skeleton>
        <div className="border-0 border-t my-1 w-full"></div>
        <div className="flex flex-wrap items-center align-center justify-start gap-1">
          <p className="font-medium text-ms m-0">Lọc theo: </p>
          {data?.filter?.brand?.split(",")?.map((brand) => (
            <Tag closable={true} onClose={() => handleCloseTag("brand", brand)}>
              Thương hiệu: {brand}
            </Tag>
          ))}
          {data?.filter?.price &&
            PRICE_LIST.find((item) => item.key === data?.filter?.price) && (
              <Tag
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
            content={<BrandsFilter data={data} />}
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
            content={<PriceFilter data={data} />}
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
      </div>
      {items?.length == 0 && !loading && (
        <div className="flex flex-col items-center justify-center w-full h-64">
          <Empty
            description={
              <p className="m-0 text-sm font-medium text-gray-600">
                Không có kết quả
              </p>
            }
          />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items?.map((product) => (
          <ProductItems data={product} key={product?.id} />
        ))}
      </div>
      <div ref={loader}>
        <Spin spinning={loading} indicator={<AiOutlineLoading />} />
      </div>
    </div>
  );
});

export { ProductPage, ProductList };
