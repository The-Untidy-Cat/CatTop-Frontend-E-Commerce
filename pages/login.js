import { FullWidthLayout } from "@/components/Layout";
import Login from "@/components/Login/login";

export default function LoginPage() {
  return (
    <FullWidthLayout
      showCategories={false}
      showFooter={false}
      showSearch={false}
      // showAccountBar={false}
      title="Đăng nhập vào CatTop"
    >
      <Login />
    </FullWidthLayout>
  );
}
