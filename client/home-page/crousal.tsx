import React from "react";
import { CarouselBlock, CarouselItem } from "./types/types";
import Image from "next/image";

type Props = {
  data: CarouselBlock | undefined;
};
export default function Crousal({ data }: Props) {
  if (!data) return null;
  return (
    <div>
      {data?.carousel_list.carousel_item.map((item: CarouselItem) => {
        if (!item.img) return null;
        return (
          <Image
            key={item.label}
            src={`${process.env.STRAPI_API_BASE_URL}${item.img?.url}`}
            alt={item.label}
            width={item.img?.width}
            height={item.img?.height}
            unoptimized
          />
        );
      })}
    </div>
  );
}
