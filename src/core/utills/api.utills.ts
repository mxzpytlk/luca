import axios from 'axios';
import config from '../../assets/config.json';
import { ApiHref } from '../enums/api.enum';

export function getUrlByHref(href: ApiHref): string {
  return config.url + href;
}

export async function post(href: ApiHref, data?: any): Promise<any> {
  return await axios({
    method: 'POST',
    url: getUrlByHref(href),
    params: data,
  });
}
