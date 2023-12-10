import { Button, Result } from "antd";
import Link from "next/link";
import { DefaultLayout } from "../Layout";

function Error({ statusCode }) {
  return (
    <DefaultLayout title="Lỗi" showCategories={false} showSearch={false}>
      <Result
        status={statusCode || "404"}
        title={statusCode || "404"}
        subTitle="Có gì đó sai sai, vui lòng thử lại sau."
        extra={
          <Link href="/">
            <Button className="bg-primary text-white">Trang chủ</Button>
          </Link>
        }
      />
    </DefaultLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
