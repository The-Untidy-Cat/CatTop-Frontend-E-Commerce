import Image from "next/image";
import cat from "@/public/logo.png";
import { LoginForm } from "@/components/Form/Authentication/login";

export default function LoginView() {
  return (
    <main className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-full w-full p-2 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo" />
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4">ĐĂNG NHẬP</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
