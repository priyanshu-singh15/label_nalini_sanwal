import React from "react";
import { LogoBlock } from "./types/types";
import Image from "next/image";

type Props = {
  data: LogoBlock | undefined;
};

export default function Logo({ data }: Props) {
  if (!data) return null;
  console.log(data);
  return (
    <div>
      <Image
        alt={data.title}
        src={`${process.env.STRAPI_API_BASE_URL}${data?.image?.url}`}
        width={data.image.width}
        height={data.image.height}
        unoptimized
      />
    </div>
  );
}
