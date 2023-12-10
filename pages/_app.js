import AuthProvider from "@/components/Provider/AuthProvider";
import "../styles/globals.css";
import { antdTheme } from "../theme/theme.config";
import { App as AppProvider, ConfigProvider } from "antd";
import ReduxProvider from "@/utils/redux/provider";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { color } from "@/theme/theme.config";
import ChatBot from "@/components/Chat/messenger";

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ChatBot />
      <Head>
        <title>CatTop - Chuyên Laptop</title>
      </Head>
      <ConfigProvider theme={antdTheme}>
        <AppProvider>
          <AuthProvider>
            <NextTopLoader color={color.primary} />
            <Component {...pageProps} />
          </AuthProvider>
        </AppProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
}
