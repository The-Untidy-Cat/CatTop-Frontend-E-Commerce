import { rateOrderItem } from "@/services/order";
import { Button, Form, Input, Rate } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;

export const RatingForm = ({ data, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    setLoading(true);
    rateOrderItem({
      orderId: data?.order_id,
      itemId: data?.id,
      data: values,
    })
      .then((res) => {
        console.log(res);
        onSuccess && onSuccess();
        onClose && onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      rating: data?.rating,
      review: data?.review,
    });
  }, [data]);
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      className="flex flex-col w-full gap-2"
      disabled={loading}
    >
      <p className="m-0">Đánh giá sản phẩm</p>
      <Form.Item name="rating" className="m-0 m-auto">
        <Rate className="m-auto" />
      </Form.Item>
      <p className="m-0">Nhận xét</p>
      <Form.Item name="review" className="m-0">
        <TextArea rows={4} placeholder="Viết cảm nhận của bạn về sản phẩm" />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          htmlType="submit"
          type="primary"
          className="w-full bg-primary text-white"
          loading={loading}
        >
          Gửi đánh giá
        </Button>
      </Form.Item>
    </Form>
  );
};
