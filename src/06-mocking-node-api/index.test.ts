import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const testDuration = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, testDuration);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, testDuration);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const testDuration = 1000;
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, testDuration);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, testDuration);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const testDuration = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, testDuration);

    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(callback, testDuration);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const testDuration = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, testDuration);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(testDuration);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(testDuration);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(testDuration);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const testPathToFile = './test';

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(testPathToFile);

    expect(spyJoin).toBeCalledWith(expect.any(String), testPathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => false);

    const file = await readFileAsynchronously(testPathToFile);

    expect(existsSyncSpy).toBeCalledWith(expect.any(String));
    expect(existsSyncSpy).toHaveReturnedWith(false);
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const testFile = 'some file';

    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => true);

    const readFileSpy = jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(async () => testFile);

    const file = await readFileAsynchronously(testPathToFile);

    expect(existsSyncSpy).toBeCalledWith(expect.any(String));
    expect(existsSyncSpy).toHaveReturnedWith(true);
    expect(readFileSpy).toBeCalledWith(expect.any(String));
    expect(file).toBe(testFile);
  });
});
