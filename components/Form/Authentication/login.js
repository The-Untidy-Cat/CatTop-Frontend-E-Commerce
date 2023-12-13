import { Form, Input, Button } from "antd";
import Link from "next/link";
import { useUser } from "../../Provider/AuthProvider";
import { useRouter } from "next/router";

const QuickLoginForm = ({ onSuccess }) => {
  const { quickLogin, loadingAuth } = useUser();
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmmit = async (values) => {
    quickLogin(values)
      .then(() => onSuccess && onSuccess())
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <Form className="flex flex-col w-full" form={form} onFinish={handleSubmmit}>
      <p className="text-sm m-0">Tên đăng nhập</p>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Không được để trống",
          },
        ]}
        className="m-0"
      >
        <Input size="small" placeholder="account" />
      </Form.Item>
      <div className="flex justify-between">
        <p className="text-sm m-0">Mật khẩu</p>
        <Link href="/forgot-password" className="font-medium text-sm">
          Quên mật khẩu?
        </Link>
      </div>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
        className="m-0"
      >
        <Input.Password size="small" placeholder="account" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          size="small"
          htmlType="submit"
          className="w-full bg-primary text-white"
          loading={loadingAuth}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      <Link
        className="w-full text-center font-medium mb-2 text-sm"
        href={{
          pathname: "/register",
          query: { ...router.query },
        }}
      >
        Chưa có tài khoản? Đăng ký ngay
      </Link>
    </Form>
  );
};

const LoginForm = ({ onSuccess }) => {
  const { login, loadingAuth } = useUser();
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmmit = async (values) => {
    login(values)
      .then(() => onSuccess && onSuccess())
      .catch((err) => {
        if (typeof err === "string") {
          form.setFields([
            {
              name: "password",
              errors: [err],
            },
          ]);
        } else {
          Object.keys(err).forEach((key) => {
            form.setFields([
              {
                name: key,
                errors: [err[key]],
              },
            ]);
          });
        }
      });
  };
  return (
    <Form
      className="flex flex-col w-full gap-2"
      form={form}
      onFinish={handleSubmmit}
    >
      <p className="m-0">Tên đăng nhập</p>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Không được để trống",
          },
        ]}
        className="m-0"
      >
        <Input placeholder="account" />
      </Form.Item>
      <div className="flex justify-between">
        <p className="m-0">Mật khẩu</p>
        <Link href="/forgot-password" className="font-medium">
          Quên mật khẩu?
        </Link>
      </div>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
        className="m-0"
      >
        <Input.Password placeholder="account" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          htmlType="submit"
          className="w-full bg-primary text-white"
          loading={loadingAuth}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      <Link
        className="w-full text-center font-medium mb-2"
        href={{
          pathname: "/register",
          query: { ...router.query },
        }}
      >
        Chưa có tài khoản? Đăng ký ngay
      </Link>
    </Form>
  );
};

export { LoginForm, QuickLoginForm };
