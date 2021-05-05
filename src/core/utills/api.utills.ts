import axios from 'axios';
import config from '../../assets/config.json';
import { ApiHref } from '../enums/api.enum';
import auth from '../../store/modules/auth';

export function getUrlByHref(href: ApiHref): string {
  return config.url + href;
}

export async function post(href: ApiHref, data?: any): Promise<any> {
  return await makeRequest(href, 'POST', data);
}

export async function get(href: ApiHref, data?: any): Promise<any> {
  return await makeRequest(href, 'GET', data);
}

async function makeRequest(href: ApiHref, method: any, data?: any): Promise<any> {
  try {
    return await axios({
      method,
      url: getUrlByHref(href),
      params: {
        ...data,
        userId: auth.getters.userId,
      },
    });
  } catch (e) {
    throw e?.response?.data;
  }
}

