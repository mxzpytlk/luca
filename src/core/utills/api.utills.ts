import axios from 'axios';
import config from '../../assets/config.json';
import { ApiHref } from '../enums/api.enum';

function getUrlByHref(href: ApiHref): string {
  return config.url + href;
}

export async function post(href: ApiHref, data?: any): Promise<any> {
  return await makeRequest(href, 'POST', data);
}

export async function get(href: ApiHref, data?: any): Promise<any> {
  return await makeRequest(href, 'GET', data);
}

export async function remove(href: ApiHref, data?: any): Promise<any> {
  return await makeRequest(href, 'DELETE', data);
}

async function makeRequest(href: ApiHref, method: any, data?: any): Promise<any> {
  try {
    return await axios({
      method,
      url: getUrlByHref(href),
      params: {
        ...data,
      },
    });
  } catch (e) {
    throw e?.response?.data;
  }
}

