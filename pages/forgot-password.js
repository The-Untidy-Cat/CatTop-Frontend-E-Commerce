import { FullWidthLayout } from "@/components/Layout";
import ForgetPassword from "@/components/Login/forgot";

export default function ForgotPasswordPage() {
    return (
        <FullWidthLayout
            showCategories={false}
            showFooter={false}
            showSearch={false}
            // showAccountBar={false}
            title="Quên mật khẩu"
        >
            <ForgetPassword/>
        </FullWidthLayout>
    )
}