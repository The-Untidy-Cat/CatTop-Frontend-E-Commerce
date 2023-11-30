import { BsPersonCircle } from "react-icons/bs";

export default function RateItems({ data, value }) {

    return (
        <div>
            {/* <p>Load: {data?.rate.props.defaultValue}</p>
            <p>Value: {value}</p> */}
            <div className="flex gap-2 border-2 border-none mt-3">
                    <BsPersonCircle className="text-4xl float-left text-secondary/[.6]" />
                    <div className="float-right flex flex-col">
                        {data?.name}
                        {data?.rate}
                        <p className="text-gray-400	text-xs mt-1">{data?.date}</p>
                        <div className="my-4">
                            {data?.comment}
                        </div>
                    </div>
            </div>
            <hr />

        </div >
    )
}