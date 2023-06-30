// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  const [a, b] = [5, 5];

  test('should add two numbers', () => {
    const addition = simpleCalculator({ a, b, action: Action.Add });

    expect(addition).toEqual(10);
  });

  test('should subtract two numbers', () => {
    const subtraction = simpleCalculator({
      a,
      b,
      action: Action.Subtract,
    });

    expect(subtraction).toEqual(0);
  });

  test('should multiply two numbers', () => {
    const multiplication = simpleCalculator({
      a,
      b,
      action: Action.Multiply,
    });

    expect(multiplication).toEqual(25);
  });

  test('should divide two numbers', () => {
    const division = simpleCalculator({
      a,
      b,
      action: Action.Divide,
    });

    expect(division).toEqual(1);
  });

  test('should exponentiate two numbers', () => {
    const exponention = simpleCalculator({
      a,
      b,
      action: Action.Exponentiate,
    });

    expect(exponention).toEqual(3125);
  });

  test('should return null for invalid action', () => {
    const invalidAction = simpleCalculator({
      a,
      b,
      action: 'InvalidAction',
    });

    expect(invalidAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgsMultiplication = simpleCalculator({
      a: 'invalidA',
      b: 'invalidB',
      action: Action.Multiply,
    });

    expect(invalidArgsMultiplication).toBeNull();
  });
});
