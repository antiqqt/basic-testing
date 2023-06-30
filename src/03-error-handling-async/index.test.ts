import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testString = 'test';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(testString)).toBe(testString);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(testString)).toThrow(testString);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
