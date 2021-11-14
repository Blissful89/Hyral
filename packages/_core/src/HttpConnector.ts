import fetch, { Request, Response } from 'node-fetch';
import ParameterBag from './ParameterBag';

export type BaseUrl = `${'http' | 'https'}://${string}`;

export type Serializers = {
  requestSerializer: (url: string, parameterBag?: ParameterBag) => Request
  responseNormalizer: <T>(response: Response) => T
};

export default class HttpConnector {
  baseUrl: BaseUrl;
  serializers: Serializers;

  constructor(baseUrl: BaseUrl, serializers: Serializers) {
    this.baseUrl = baseUrl;
    this.serializers = serializers;
  }

  request<T>(path: string, parameterBag?: ParameterBag) {
    return fetch(this.serializers.requestSerializer(`${this.baseUrl}${path}`, parameterBag))
      .then(((response) => this.serializers.responseNormalizer<T>(response)));
  }
}
