import { throttledGetDataFromApi } from '07-mocking-lib-api';
import axios from 'axios';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const testConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };
  const testRoute = '/posts';
  const testResponse = {
    data: 'test',
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValueOnce(testResponse),
    }));

    await throttledGetDataFromApi(testRoute);

    expect(axios.create).toHaveBeenCalledWith(testConfig);
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn().mockResolvedValueOnce(testResponse);

    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get: mockedGet,
    }));

    await throttledGetDataFromApi(testRoute);
    jest.runAllTimers();

    expect(mockedGet).toHaveBeenCalledWith(testRoute);
  });

  test('should return response data', async () => {
    const mockedGet = jest.fn().mockResolvedValueOnce(testResponse);

    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get: mockedGet,
    }));

    const data = await throttledGetDataFromApi(testRoute);
    jest.runAllTimers();

    expect(data).toBe(testResponse.data);
  });
});
