import axios, { AxiosRequestConfig } from 'axios';

export default function request(
  method: 'get' | 'post',
  path: string,
  params: any
) {
  const config = method === 'get' ? { params: params } : { data: params };
  return axios({
    method: method,
    url: `${process.env.baseUrl}${path}`,
    ...config
  }).then((response) => response.data);
}
