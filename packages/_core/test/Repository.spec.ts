import Repository, { BaseUrl } from '../src/Repository';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ json: () => '' })),
  Request: jest.fn(() => class Request {}),
}));

describe('Repository', () => {
  let baseUrl: BaseUrl;
  let normalizer: () => any;

  beforeEach(() => {
    baseUrl = 'http://test';
    normalizer = jest.fn((): any => 'response');
  });

  test('that the repository is correctly initialized', () => {
    const repository = new Repository(baseUrl, normalizer);

    expect(repository).toBeInstanceOf(Repository);
  });

  test('that the repository cannot be altered after instantiation', () => {
    const repository = new Repository(baseUrl, normalizer);
    const newBaseUrl = 'http://new';
    const newNormalizer = (): any => 'new';

    const baseUrlCheck = () => {
      repository.baseUrl = newBaseUrl;
    };
    const normalizerCheck = () => {
      repository.normalizer = newNormalizer;
    };

    expect(baseUrlCheck).toThrow(Error);
    expect(normalizerCheck).toThrow(Error);
  });

  test('that the repository can fire a request', async () => {
    const repository = new Repository(baseUrl, normalizer);

    await expect(repository.request('/test')).resolves.toBeTruthy();
    expect(normalizer).toHaveBeenCalled();
  });
});
