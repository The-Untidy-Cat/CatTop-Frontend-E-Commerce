import { Rate } from "antd";
import { BsPersonCircle } from "react-icons/bs";

export default function RateItems({ data }) {
  return (
    <div className="flex flex-col gap-1 w-full shrink-0 py-1">
      <p className="font-semibold m-0">
        {String(data?.last_name + " " + data?.first_name)?.trim()}
      </p>
      <Rate value={data?.rating} disabled={true}/>
      <p className="m-0">{data?.review}</p>
    </div>
  );
}
