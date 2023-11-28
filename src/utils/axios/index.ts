import Axios, { AxiosRequestConfig } from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseInstance = () => {
  const axiosInstance = Axios.create({
    baseURL: apiUrl,
  });


  return axiosInstance;
};

export const get = async (url: string, config?: AxiosRequestConfig) => {
  const axiosInstance = baseInstance();


  const res = await axiosInstance.get(url, {
    ...config,

  });
  return res;
};