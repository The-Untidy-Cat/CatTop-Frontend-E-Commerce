import { FullWidthLayout } from "@/components/Layout";
import RegistrationForm from "@/components/Register";
import { AnonymousWrapper } from "@/components/Wrapper";

export default function RegistrationPage() {
  return (
    <AnonymousWrapper>
      <FullWidthLayout
        showCategories={false}
        showFooter={false}
        showSearch={false}
        // showAccountBar={false}
        title="Đăng ký - CatTop"
      >
        <RegistrationForm />
      </FullWidthLayout>
    </AnonymousWrapper>
  );
}
