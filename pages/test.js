import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layout";
import Footer from "@/components/Layout/Footer";
import Cart from "@/components/Cart/cart";
import Login from "@/components/Login/login";
import { ProductPage } from "@/components/Product/display";
// import ForgetPassword from "@/components/Login/forgot";
// import Detail from "@/components/LapDetail/comp";
// import Booking from "@/components/book/comp";
// import Apps from "@/components/LapDetail/phone";
import RateProduct from "@/components/Rate";
import axios from "axios";
import { api } from "@/utils/axios";
import { message } from "antd";

const App = () => {
  const [brands, setBrands] = useState([]);
  const handleAxios = async () => {
    const response = await api.get("/web/brands");
    // const response1 = await api.get("/customer/user");
    console.log(response)
    setBrands(response.data.data);
  };
  useEffect(() => {
    console.log("App");
    handleAxios();
  }, []);
  return (
    <>
    Axios Demo
     {brands && brands.map(brand => (
      <p key={brand.id}>Hello {brand.name} </p>
    ))}
      {/* <ProductPage /> */}
    </>
  );
};
export default App;
