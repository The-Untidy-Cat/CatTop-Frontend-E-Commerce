import AuthProvider from "@/components/Providers/AuthProvider";
import PrivateWrapper from "../components/Wrappers/index";
import "../styles/globals.css";
import { color } from "../theme/theme.config";
import { App as AppProvider, ConfigProvider } from "antd";

const theme = {
  token: {
    fontsizeBase: "14px",
    fontFamily: "Montserrat",
    colorPrimary: color.primary,
    colorSecondary: color.secondary,
    colorSuccess: color.success,
    colorWarning: color.warning,
    colorError: color.error,
    colorInfo: color.info,
    colorTextBase: color.textBase,
    colorBgBase: color.bgBase,
    colorWhite: color.white,
  },
};

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={theme}>
      <AppProvider>
        <AuthProvider>
          <PrivateWrapper>
            <Component {...pageProps} />
          </PrivateWrapper>
        </AuthProvider>
      </AppProvider>
    </ConfigProvider>
  );
}
