import { DefaultLayout } from "@/components/Layout";
import Profile from "@/components/Profile";

export default function ProfilePage() {
    return (
        <DefaultLayout fullWidth={true}>
            <Profile />
        </DefaultLayout>
    )
}