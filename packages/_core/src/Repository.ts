import fetch, { Request, RequestInit } from 'node-fetch';
import Resource from './Resource';

export type BaseUrl = `${'http' | 'https'}://${string}`;
export type NormalizedResponse<T> = { data: Resource<T>, [key: string]: unknown };
export type Normalizer = <T>(response: unknown) => T;

/**
 * The repository can make requests and normalizes the expected response
 */
export default class Repository {
  baseUrl: BaseUrl;
  normalizer: Normalizer;

  constructor(baseUrl: BaseUrl, normalizer: Normalizer) {
    this.baseUrl = baseUrl;
    this.normalizer = normalizer;
    Object.freeze(this);
  }

  request<T>(path: string, info?: RequestInit): Promise<T> {
    return fetch(new Request(this.baseUrl + path, info))
      .then((response) => response.json())
      .then(((response) => this.normalizer<T>(response)));
  }
}
