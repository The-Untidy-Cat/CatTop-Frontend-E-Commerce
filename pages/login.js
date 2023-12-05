import { FullWidthLayout } from "@/components/Layout";
import LoginView from "@/components/Login/index";
import { AnonymousWrapper } from "@/components/Wrapper";

export default function LoginPage() {
  return (
    <AnonymousWrapper>
      <FullWidthLayout
        showCategories={false}
        showFooter={false}
        showSearch={false}
        title="Đăng nhập vào CatTop"
      >
        <LoginView />
      </FullWidthLayout>
    </AnonymousWrapper>
  );
}
