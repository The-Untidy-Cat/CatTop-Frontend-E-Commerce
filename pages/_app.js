import AuthProvider from "@/components/Provider/AuthProvider";
import "../styles/globals.css";
import { antdTheme } from "../theme/theme.config";
import { App as AppProvider, ConfigProvider } from "antd";
import ReduxProvider from "@/utils/redux/provider";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Head>
        <title>CatTop - Chuyên Laptop</title>
      </Head>
      <ConfigProvider theme={antdTheme}>
        <AppProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </AppProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
}
