const [mockOneText, mockTwoText, mockThreeText] = [
  'mockOneText',
  'mockTwoText',
  'mockThreeText',
];

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => mockOneText),
    mockTwo: jest.fn(() => mockTwoText),
    mockThree: jest.fn(() => mockThreeText),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', async () => {
    const { mockOne, mockThree, mockTwo } = await import('./index');
    console.log = jest.fn();

    expect(mockOne()).toBe(mockOneText);
    expect(mockTwo()).toBe(mockTwoText);
    expect(mockThree()).toBe(mockThreeText);

    expect(mockOne).toBeCalled();
    expect(mockTwo).toBeCalled();
    expect(mockThree).toBeCalled();

    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', async () => {
    const { unmockedFunction } = await import('./index');
    console.log = jest.fn();

    expect(unmockedFunction()).toBeUndefined();
    expect(console.log).toBeCalled();
  });
});
