import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const testValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testValues)).toEqual(
      generateLinkedList(testValues),
    );
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testValues)).toMatchSnapshot();
  });
});
