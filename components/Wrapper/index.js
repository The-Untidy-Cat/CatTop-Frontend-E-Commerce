import { Spin } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "../Provider/AuthProvider";

export default function PrivateWrapper({ children }) {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  if (loadingUser)
    return (
      <Spin
        spinning={true}
        className="flex items-center align-center justify-center fixed w-screen h-screen z-50"
        size="large"
      />
    );
  if (!user) router.push("/login");
  return children;
}

export function AnonymousWrapper({ children }) {
  const { user, loadingUser } = useAuth();
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
