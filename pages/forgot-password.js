import { FullWidthLayout } from "@/components/Layout";
import ForgetPassword from "@/components/Login/forgot";
import { AnonymousWrapper } from "@/components/Wrapper";

export default function ForgotPasswordPage() {
  return (
    <AnonymousWrapper>
      <FullWidthLayout
        showCategories={false}
        showFooter={false}
        showSearch={false}
        // showAccountBar={false}
        title="Đặt lại mật khẩu"
      >
        <ForgetPassword />
      </FullWidthLayout>
    </AnonymousWrapper>
  );
}
