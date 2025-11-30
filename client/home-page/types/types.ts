export type HomePageResponse = {
  data: {
    navbar: TNavbar;
    block: Block[];
    footer: any;
  };
};

// navbar
export type TNavbar = {
  navLinks: {
    id: number;
    navLink: NavLink[];
  };
};

export type NavLink = {
  id: number;
  label: string;
  path: string;
};

// block
export type Block = {
  __component: BLOCK_TYPES;
  id: number;
};

// carousel
export type CarouselBlock = Block & {
  carousel_list: {
    id: number;
    carousel_item: CarouselItem[];
  };
};

export type CarouselItem = {
  img: TImage | null;
  label: string;
  path: string;
};

export type LogoBlock = Block & {
  title: string;
  path: string;
  image: TImage;
};

// enums
export enum BLOCK_TYPES {
  CROUSAL = "layout.carousel",
  LOGO = "layout.logo",
  CATEGORY = "layout.category",
  FEATURED = "layout.featured",
  FOOTER = "layout.footer",
}

// common
export type TImage = {
  url: string;
  width: number;
  height: number;
};
