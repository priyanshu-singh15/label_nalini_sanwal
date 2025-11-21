import { API_URL } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import style from "./style";

export default function LogoComponent({ data }: { data: any }) {
  return (
    <Link href={data.path || "/"} className={style.imgLink}>
      {data.image && (
        <div className={style.imgWrapper}>
          <Image
            unoptimized
            src={`${API_URL}${data.image.url}`}
            alt={data.title}
            fill
            className={style.image}
          />
        </div>
      )}
    </Link>
  );
}
