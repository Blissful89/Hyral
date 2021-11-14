import ParameterBag from '../src/ParameterBag';
import HttpConnector, { BaseUrl, Serializers } from '../src/HttpConnector';

jest.mock('node-fetch', () => jest.fn(() => Promise.resolve(true)));

describe('HttpConnector', () => {
  let baseUrl: BaseUrl;
  let serializers: Serializers;

  beforeEach(() => {
    baseUrl = 'http://test';
    serializers = {
      requestSerializer: jest.fn((string: string): any => `${baseUrl}${string}`),
      responseNormalizer: jest.fn((response: unknown): any => response),
    };
  });

  test('that the http connector is correctly initialized', () => {
    const connector = new HttpConnector(baseUrl, serializers);

    expect(connector).toBeInstanceOf(HttpConnector);
  });

  test('that the connector can fire a request', async () => {
    const connector = new HttpConnector(baseUrl, serializers);

    await expect(connector.request('/test')).resolves.toBeTruthy();
    expect(serializers.requestSerializer).toHaveBeenCalled();
    expect(serializers.responseNormalizer).toHaveBeenCalled();
  });

  test('that the connector can combine baseUrl with path', async () => {
    const connector = new HttpConnector(baseUrl, serializers);
    const path = '/test';

    await connector.request(path);

    expect(serializers.requestSerializer).toHaveBeenCalledWith(`${baseUrl}${path}`, undefined);
  });

  test('that the connector can be fired with a parameterbag', async () => {
    const connector = new HttpConnector(baseUrl, serializers);
    const parameterBag = new ParameterBag();

    await connector.request('', parameterBag);
    expect(serializers.requestSerializer).toHaveBeenCalledWith(baseUrl, parameterBag);
  });
});
