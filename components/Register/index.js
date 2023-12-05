import Image from "next/image";
import cat from "@/public/logo.png";
import { RegistrationForm } from "../Form/Authentication/register";

function RegistrationView() {
  return (
    <main className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-fit min-h-full w-full px-2 py-2 py-5 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit min-h-full rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo" />
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4 uppercase">
            Tạo tài khoản
          </h1>
        </div>
        <RegistrationForm/>
      </div>
    </main>
  );
}

export default RegistrationView;
