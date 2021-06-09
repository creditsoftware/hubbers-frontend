export const contentfulLoaderForNextImg = ({
  src,
  quality,
  width
}) => {
  const params = [`w=${width}`];
  if (quality) {
    params.push(`q=${quality}`);
  }
  return `${src}?${params.join('&')}`;
};