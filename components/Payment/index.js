import { getDeepLinkForAndroid, getDeepLinkForIOS } from "@/services/banking";
import { Button, Drawer, Image, Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BrowserView,
  MobileView,
  isAndroid,
  isIOS,
  isMobile,
} from "react-device-detect";
import { FaDownload, FaQrcode } from "react-icons/fa";

export const BankingBox = ({ amount, description }) => {
  const [loading, setLoading] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [visible, setVisible] = useState(false);
  const qrUrl = `${process.env.NEXT_PUBLIC_VIETQR_IMG_URL}/${
    process.env.NEXT_PUBLIC_BANK_ID
  }-${process.env.NEXT_PUBLIC_ACCOUNT_NO}-compact2.png?amount=${Number(
    amount
  )}&addInfo=${description}&accountName=${
    process.env.NEXT_PUBLIC_ACCOUNT_NAME
  }`;
  const getBankList = async () => {
    setLoading(true);
    if (isAndroid) {
      const data = await getDeepLinkForAndroid();
      setBankList(data);
    } else if (isIOS) {
      const data = await getDeepLinkForIOS();
      setBankList(data);
    } else {
      setBankList([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isMobile) {
      getBankList();
    }
  }, []);
  return (
    <>
      <Button
        className="flex justify-center items-center bg-primary text-white"
        icon={<FaQrcode />}
        onClick={() => setVisible(true)}
      >
        Thanh toán nhanh qua QR
      </Button>
      <MobileView>
        <Drawer
          title="Quét mã QR thanh toán"
          open={visible}
          onClose={() => setVisible(false)}
          placement="bottom"
          height={"100%"}
        >
          <div className="relative flex flex-col w-full h-fit">
            <Image
              src={qrUrl}
              className="w-full h-full object-contain"
              alt="qr-code"
              preview={false}
            />
            <p className="text-sm text-center m-0 font-medium">{description}</p>
            <Link
              href={qrUrl}
              download={`${description}.png`}
              target="_blank"
              className="absolute top-0 right-0"
            >
              <Button type="link" icon={<FaDownload />}></Button>
            </Link>
          </div>
          <p className="text-sm text-center m-0 font-medium my-2">
            Mở nhanh ứng dụng để thanh toán
          </p>
          <div className="grid grid-cols-1 gap-1">
            {bankList?.map((bank) => (
              <Link
                href={bank?.deeplink}
                key={bank?.appName}
                target="_blank"
                rel="noreferrer"
                className="flex w-full h-full justify-start items-center gap-1 bg-gray-100"
              >
                <Image
                  src={bank?.appLogo}
                  alt={bank?.appName}
                  preview={false}
                  className="h-12 shrink-0"
                />
                <p className="text-xs">{bank?.appName}</p>
              </Link>
            ))}
          </div>
        </Drawer>
      </MobileView>
      <BrowserView>
        <Modal
          title="Quét mã QR thanh toán"
          open={visible}
          onCancel={() => setVisible(false)}
          centered={true}
          footer={null}
        >
          <div className="relative flex flex-col w-full h-fit">
            <Image
              src={qrUrl}
              className="w-full h-full object-contain"
              alt="qr-code"
              preview={false}
            />
            <p className="text-sm text-center m-0 font-medium">{description}</p>
            <Link
              href={qrUrl}
              download={`${description}.png`}
              target="_blank"
              className="absolute top-0 right-0"
            >
              <Button type="link" icon={<FaDownload />}></Button>
            </Link>
          </div>
        </Modal>
      </BrowserView>
    </>
  );
};
