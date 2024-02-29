export default function akamaiImageLoader({src, width, quality}) {
  if (src.includes("?")) {
    return `${src};Resize,width=${width}`;
  } else {
    return `${src}?imwidth=${width}`;
  }
}
