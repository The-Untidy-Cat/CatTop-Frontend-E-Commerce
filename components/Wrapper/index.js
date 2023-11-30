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
      />
    );
  if (!user)
    router.push({
      pathname: "/login",
      query: { redirect: router.asPath },
    });
  return children;
}

export function AnonymousWrapper({ children }) {
  const { user, loadingUser } = useUser();
  const router = useRouter();
  if (loadingUser)
    return (
      <Spin
        spinning={true}
        className="flex items-center align-center justify-center fixed w-screen h-screen z-50"
        size="large"
      />
    );
  if (user) router.push("/");
  return children;
}
