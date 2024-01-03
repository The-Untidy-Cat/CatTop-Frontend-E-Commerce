import { Button, Form, Pagination, Radio, Rate } from "antd";
import RateItems from "./items";
import { useState } from "react";

export default function ProductRatingList({ data }) {
  const [selected, setSelected] = useState("all");

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex justify-between items-center align-center w-full">
        <p className="sticky font-semibold text-lg top-0">
          Đánh giá (
          {data?.variants?.reduce((total, variant) => {
            return total + variant?.reviews?.length;
          }, 0) || 0}
          )
        </p>
        <div className="flex gap-1">
          <Rate
            allowHalf
            value={
              Number(
                data?.variants?.reduce((total, variant) => {
                  return (
                    total +
                    variant?.reviews?.reduce((total, review) => {
                      return total + Number(review?.rating);
                    }, 0)
                  );
                }, 0)
              ) /
              Number(
                data?.variants?.reduce((total, variant) => {
                  return total + Number(variant?.reviews?.length);
                }, 0)
              )
            }
            disabled={true}
          />
          <p className="text-gray-500">
            {Number(
              data?.variants?.reduce((total, variant) => {
                return (
                  total +
                  variant?.reviews?.reduce((total, review) => {
                    return total + Number(review?.rating);
                  }, 0)
                );
              }, 0)
            ) /
              Number(
                data?.variants?.reduce((total, variant) => {
                  return total + Number(variant?.reviews?.length);
                }, 0)
              )}
          </p>
        </div>
      </div>
      <Radio.Group
        defaultValue={"all"}
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
        }}
        optionType="button"
        className="w-full grid grid-cols-3 gap-2 py-2 c-variant-radio-group"
        rootClassName="w-full"
      >
        <Radio value="all" className="border rounded">
          Tất cả (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + Number(review?.rating);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
        <Radio value="5" className="border rounded">
          5 sao (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + (Number(review?.rating) === 5 ? 1 : 0);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
        <Radio value="4" className="border rounded">
          4 sao (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + (Number(review?.rating) === 4 ? 1 : 0);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
        <Radio value="3" className="border rounded">
          3 sao (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + (Number(review?.rating) === 3 ? 1 : 0);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
        <Radio value="2" className="border rounded">
          2 sao (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + (Number(review?.rating) === 2 ? 1 : 0);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
        <Radio value="1" className="border rounded">
          1 sao (
          {Number(
            data?.variants?.reduce((total, variant) => {
              return (
                total +
                variant?.reviews?.reduce((total, review) => {
                  return total + (Number(review?.rating) === 1 ? 1 : 0);
                }, 0)
              );
            }, 0)
          )}
          )
        </Radio>
      </Radio.Group>
      <div className="flex w-full h-full relative overflow-y-auto grow-0 max-h-36">
        <div className="flex flex-col w-full divide-y h-fit">
          {data?.variants?.map((variant) => {
            return variant?.reviews
              ?.filter((review) => {
                if (selected === "all") return true;
                return Number(review?.rating) === Number(selected);
              })
              .map((review) => {
                return <RateItems data={review} key={review?.id}/>;
              });
          })}
        </div>
      </div>
    </div>
  );
}
