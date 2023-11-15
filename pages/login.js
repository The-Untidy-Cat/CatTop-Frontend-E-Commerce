import { FullWidthLayout } from "@/components/Layout";
import Login from "@/components/Login/login";
import { AnonymousWrapper } from "@/components/Wrapper";

export default function LoginPage() {
  return (
    <AnonymousWrapper>
      <FullWidthLayout
        showCategories={false}
        showFooter={false}
        showSearch={false}
        // showAccountBar={false}
        title="Đăng nhập vào CatTop"
      >
        <Login />
      </FullWidthLayout>
    </AnonymousWrapper>
  );
}
