export const getBase64 = (image, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', ()=>callback(reader.result));
  reader.readAsDataURL(image);
};