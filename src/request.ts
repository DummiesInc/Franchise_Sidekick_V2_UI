// frontend/src/request.ts
import axios, { AxiosRequestConfig } from 'axios';

// const BASE_URL = 'http://localhost:3001'
// const BASE_URL = 'http://127.0.0.1:3001';

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
