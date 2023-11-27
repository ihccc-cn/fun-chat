/**
 * 将图片文件转换为 base64
 * @param {Bolb} file 图片文件
 * @returns
 */
const getBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
};

export default getBase64;
