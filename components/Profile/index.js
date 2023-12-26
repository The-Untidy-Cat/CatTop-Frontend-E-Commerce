import { useEffect, useState } from "react";
import UpdateProfileForm, { ChangePasswordForm } from "../Form/Profile";
import { ModalToggle } from "../Modal";
import { EditAddressForm, NewAddressForm } from "../Form/Address";
import { FaPlus } from "react-icons/fa";
import { getAllAddress } from "@/services/address";
import { PROVINCES } from "@/app.config";
import { Empty, Spin } from "antd";

export default function ProfileView() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Hồ sơ</h1>
      <UpdateProfileForm />
    </div>
  );
}

export const ChangePasswordView = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Đổi mật khẩu</h1>
      <ChangePasswordForm />
    </div>
  );
};

export const AddressView = () => {
  const [addressBook, setAddressBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await getAllAddress();
      setAddressBook(response?.data?.address_books);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between w-full gap-1">
        <h1 className="text-lg font-semibold w-full">Địa chỉ</h1>
        <ModalToggle
          modal={{
            title: "Thêm địa chỉ",
          }}
          button={{
            size: "small",
            label: "Thêm",
            icon: <FaPlus />,
            type: "link",
            className: "p-0",
          }}
        >
          <NewAddressForm onSuccess={getData} />
        </ModalToggle>
      </div>
      <Spin spinning={loading} className="flex flex-col w-full justify-center items-center align-center w-full h-full">
        <div className="flex flex-col w-full divide-y">
          {addressBook.length ? (
            addressBook?.map((address) => (
              <div
                key={address.id}
                className="flex flex-col w-full p-2"
              >
                <div className="flex justify-between items-center align-center w-full">
                  <p className="m-0 text-sm w-full">
                    <span className="font-semibold">{address.name}</span> |{" "}
                    <span>{address.phone}</span>
                  </p>
                  <ModalToggle
                    modal={{
                      title: "Cập nhật địa chỉ",
                    }}
                    button={{
                      size: "small",
                      label: "Sửa",
                      type: "link",
                      className: " w-fit float-right p-0",
                    }}
                  >
                    <EditAddressForm onSuccess={getData} data={address} />
                  </ModalToggle>
                </div>
                <div className="flex flex-col w-full">
                  <p className="m-0">{address.address_line}</p>
                  <p className="m-0">
                    {
                      PROVINCES.find((p) => p.code === address.province)
                        ?.districts?.find((d) => d.code === address.district)
                        ?.wards?.find((w) => w.code === address.ward)?.name
                    }
                    ,{" "}
                    {
                      PROVINCES.find(
                        (p) => p.code === address.province
                      )?.districts?.find((d) => d.code === address.district)
                        ?.name
                    }
                    , {PROVINCES.find((p) => p.code === address.province)?.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Empty description="Chưa có địa chỉ nào" />
          )}
        </div>
      </Spin>
    </div>
  );
};
