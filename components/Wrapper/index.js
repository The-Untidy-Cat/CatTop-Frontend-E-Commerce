import { Spin } from "antd";
import { useRouter } from "next/router";
import { useUser } from "../Provider/AuthProvider";

export default function PrivateWrapper({ children }) {
  const { user, loadingUser } = useUser();
  const router = useRouter();
  if (loadingUser)
    return (
      <Spin
        spinning={true}
        className="flex items-center align-center justify-center fixed w-screen h-screen z-50"
        size="large"
        tip="Đang xử lý..."
      />
    );
  else if (!user)
    router.push({
      pathname: "/login",
      query: { redirect: router.asPath },
    });
  else return children;
}

export function AnonymousWrapper({ children }) {
  const { user, loadingUser } = useUser();
  const router = useRouter();
  const { query } = router;
  if (loadingUser)
    return (
      <Spin
        spinning={true}
        className="flex items-center align-center justify-center fixed w-screen h-screen z-50"
        size="large"
      />
    );
  else if (user) {
    if (query?.redirect) router.push(query?.redirect);
    else router.push("/");
  } else return children;
}
