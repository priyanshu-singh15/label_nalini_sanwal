const imageStyle: string[] = ["object-cover"];

const imgLinkStyle: string[] = [];

const imgWrapper: string[] = [];

export default {
  image: imageStyle.join(" "),
  imgLink: imgLinkStyle.join(" "),
  imgWrapper: imgWrapper.join(" "),
} as const;
