import Crousal from "@/home-page/crousal";
import Logo from "@/home-page/logo";
import Navbar from "@/home-page/navbar";
import {
  Block,
  BLOCK_TYPES,
  CarouselBlock,
  HomePageResponse,
  LogoBlock,
} from "@/home-page/types/types";

export const API_URL = process.env.STRAPI_API_BASE_URL;

const API_TOKEN = process.env.STRAPI_API_KEY;

async function getHomePageData() {
  const url = new URL(`${API_URL}/api/home-page`);

  url.searchParams.append(
    "populate[navbar][populate][navLinks][populate]",
    "*"
  );
  url.searchParams.append(
    "populate[block][on][layout.carousel][populate][carousel_list][populate][carousel_item][populate]",
    "*"
  );
  url.searchParams.append("populate[block][on][layout.logo][populate]", "*");
  url.searchParams.append(
    "populate[block][on][layout.category][populate][category_item][populate]",
    "*"
  );
  url.searchParams.append(
    "populate[block][on][layout.featured][populate][featured_item][populate]",
    "*"
  );
  url.searchParams.append(
    "populate[footer][populate][site_links][populate]",
    "*"
  );

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
// ============ MAIN PAGE ============
export default async function HomePage() {
  const homeData = (await getHomePageData()) as HomePageResponse | null;

  if (!homeData) {
    return null;
  }
  const { navbar, block, footer } = homeData.data;

  const crousalBlockData = block.find(
    (b: Block) => b.__component === BLOCK_TYPES.CROUSAL
  ) as CarouselBlock | undefined;

  const logoBlockData = block.find(
    (b: Block) => b.__component === BLOCK_TYPES.LOGO
  ) as LogoBlock | undefined;

  return (
    <main className="min-h-screen">
      <Navbar data={navbar} />
      <Logo data={logoBlockData} />
      <Crousal data={crousalBlockData} />
    </main>
  );
}
