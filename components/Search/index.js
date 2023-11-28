import { Button, Drawer, Form, Input, Skeleton } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import SearchItems from "./items";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword, clearKeywords } from "@/utils/redux/actions/search";
import { searchProduct } from "@/services/search";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

function SearchResults({ data, form, open, keyword = "" }) {
  const searchHistory = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = open;
  const [searchResult, setSearchResult] = useState(data?.newProducts || []);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchProduct({
        name: keyword ? keyword.trim() : "",
      });
      const { data } = response;
      setSearchResult(data?.records);
      setLoading(false);
    } catch (error) {
      setSearchResult([]);
      console.log(error);
      setLoading(false);
    }
  };
  const handleSelectKeyword = (e, item) => {
    e.preventDefault();
    form.setFieldValue("keyword", item);
    form.submit();
    setOpen(false);
  };
  useEffect(() => {
    if (keyword === "") {
      return;
    }
    const timeOutId = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timeOutId);
  }, [keyword]);
  useEffect(() => {
    if (keyword === "") return;
    if (open && keyword != data?.keyword) handleSearch();
  }, [isOpen]);
  return (
    <div className="flex w-full h-full relative overflow-y-auto">
      <div className="flex flex-col gap-2 w-full h-fit md:px-5 md:py-4 px-0 py-2 absolute">
        {searchHistory?.length > 0 && keyword == "" && (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center align-center w-full">
              <p className="m-0 font-semibold">Tìm kiếm gần đây</p>
              <Button
                type="link"
                className="font-medium p-0 w-fit"
                onClick={() => {
                  dispatch(clearKeywords());
                }}
              >
                Xoá tất cả
              </Button>
            </div>
            {searchHistory.map((item) => {
              return (
                <Button
                  key={item}
                  type="link"
                  className="font-medium p-0 w-fit"
                  onClick={(e) => handleSelectKeyword(e, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col w-full">
          <p className="m-0 font-semibold">Sản phẩm</p>
          <Skeleton
            loading={loading}
            active
            title={false}
            paragraph={{
              rows: 2,
            }}
            className="mb-2"
          >
            {searchResult?.length > 0 ? (
              <div className="flex flex-col divide-y w-full">
                {searchResult?.map((item) => {
                  return <SearchItems data={item} key={item?.slug}/>;
                })}
              </div>
            ) : (
              <p className="m-0 text-center text-gray-600">Không có kết quả</p>
            )}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export function SearchBox({ data }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [showDropdown, setShowDropdown] = useState(false);
  const [temporalKeyword, setTemporalKeyword] = useState(data?.keyword || "");
  const [loading, setLoading] = useState(true);
  const handleSearchSubmit = async (value) => {
    const { keyword } = value;
    dispatch(addKeyword(keyword));
    setShowDropdown(false);
    router.push({
      pathname: "/products",
      query: { ...router.query, name: keyword },
    });
  };
  useEffect(() => {
    form.setFieldsValue({ keyword: data?.keyword || "" });
  }, []);
  return (
    <Form
      form={form}
      className="flex justify-center items-center align-center gap-3 w-full max-w-md px-2 shrink-0 relative sticky top-0 z-10"
      onFinish={handleSearchSubmit}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowDropdown(false);
        }
      }}
      onFieldsChange={(changedFields, allFields) => {
        const { keyword } = allFields[0];
        setTemporalKeyword(keyword || "");
      }}
    >
      <Form.Item name="keyword" className="m-0 p-0">
        <Input
          placeholder="Tên sản phẩm, nhu cầu, hãng"
          prefix={
            <AiOutlineSearch className="font-bold text-primary text-base m-0 p-0" />
          }
          className="flex px-2.5 py-2 bg-secondary/[.2] border-primary border-0 focus:border rounded-full items-center align-center font-medium search"
          allowClear
          autoComplete="off"
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setTemporalKeyword(e.target.value)}
        />
      </Form.Item>
      {showDropdown && (
        <div className="absolute top-12 left-[-1/2] h-80 w-96 border bg-white shadow rounded c-search-dropdown">
          <SearchResults
            form={form}
            open={[showDropdown, setShowDropdown]}
            data={data}
            loading={loading}
            keyword={temporalKeyword}
          />
        </div>
      )}
    </Form>
  );
}

export function SearchBoxMobile({ data }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [showDropdown, setShowDropdown] = useState(false);
  const [temporalKeyword, setTemporalKeyword] = useState(data?.keyword || "");
  const [loading, setLoading] = useState(true);
  const handleSearchSubmit = async (value) => {
    const { keyword } = value;
    dispatch(addKeyword(keyword));
    setShowDropdown(false);
    router.push({
      pathname: "/products",
      query: { ...router.query, name: keyword },
    });
  };
  useEffect(() => {
    form.setFieldsValue({ keyword: data?.keyword || "" });
  }, []);
  return (
    <>
      <Button
        type="text"
        onClick={() => setOpen(true)}
        className="flex justify-center items-center align-center px-3 py-2.5 font-semibold "
      >
        <FaSearch className="text-lg text-primary" />
      </Button>
      <Drawer
        title="Tìm kiếm"
        width={'100%'}
        height={'100%'}
        placement="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Form
          form={form}
          className="w-full"
          onFinish={handleSearchSubmit}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowDropdown(false);
            }
          }}
          onFieldsChange={(changedFields, allFields) => {
            const { keyword } = allFields[0];
            setTemporalKeyword(keyword || "");
          }}
        >
          <Form.Item name="keyword" className="m-0 p-0">
            <Input
              placeholder="Tên sản phẩm, nhu cầu, hãng"
              prefix={
                <AiOutlineSearch className="font-bold text-primary text-base m-0 p-0" />
              }
              className="flex px-2.5 py-2 bg-secondary/[.2] border-primary border-0 focus:border rounded-full items-center align-center font-medium search"
              allowClear
              autoComplete="off"
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => setTemporalKeyword(e.target.value)}
            />
          </Form.Item>
        </Form>
        <SearchResults
            form={form}
            open={[open, setOpen]}
            data={data}
            loading={loading}
            keyword={temporalKeyword}
          />
      </Drawer>
    </>
  );
}
