import { type RcFile } from 'antd/es/upload';

export const getBase64 = async (file: RcFile): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
