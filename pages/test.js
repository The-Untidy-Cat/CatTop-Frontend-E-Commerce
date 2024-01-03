import Error from "@/components/Error";
import AboutUs from "@/components/AboutUs";
import GuaranteePolicy from "@/components/Guarantee";
import ReturnPolicy from "@/components/Return";
import PurchasePolicy from "@/components/Purchase";
import { AnonymousWrapper } from "@/components/Wrapper";
import { FullWidthLayout } from "@/components/Layout";

export default function Test() {
  return (
    <AnonymousWrapper>
      <FullWidthLayout>
        <PurchasePolicy />
      </FullWidthLayout>
    </AnonymousWrapper>
  )
}