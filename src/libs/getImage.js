import isHttp from "is-http";

export default (img, isBackground, opacity, dark) => {
  let imagem;
  if (!img) return null;
  const isRemote = isHttp(img);
  if (isRemote) {
    imagem = img;
  } else {
    imagem = require(`~/assets/images/${img}`);
  }
  const faded = `linear-gradient(to right, rgba(${
    dark ? "0,0,0" : "255,255,255"
  }, ${opacity}) 0 100%),`;
  if (isBackground)
    return `background-image: ${opacity && faded} url("${imagem}")

`;
  else return imagem;
};
