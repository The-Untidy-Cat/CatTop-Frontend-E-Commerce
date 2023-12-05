import { DefaultLayout } from "@/components/Layout";
import { SidebarMenu } from "@/components/Layout/Menu";
import { ProfileLayout } from "@/components/Layout/Profile";
import ProfileView from "@/components/Profile";
import PrivateWrapper from "@/components/Wrapper";
import { Axios } from "@/utils/axios";

export default function ProfilePage({ data }) {
  return (
    <PrivateWrapper>
      <DefaultLayout data={data}>
        <div className="md:hidden">
          <ProfileLayout />
        </div>
        <div className="hidden md:block">
          <ProfileLayout activeKey={"my-profile"}>
            <ProfileView />
          </ProfileLayout>
        </div>
      </DefaultLayout>
    </PrivateWrapper>
  );
}

export async function getStaticProps() {
  try {
    const [brands, newProducts] = await Promise.all([
      await Axios.get("/web/brands"),
      await Axios.get("/web/search?limit=10&order_by=created_at&order=desc"),
    ]);
    return {
      props: {
        data: {
          brands: brands.data.data || [],
          newProducts: newProducts?.data?.data?.records || [],
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          brands: [],
          newProducts: [],
        },
      },
    };
  }
}
