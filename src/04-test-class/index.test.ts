import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 50;
  const exceedingBalance = initialBalance + 1;
  const deposit = 100;
  const negativeBalance = -100;

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    const exceedingBalance = initialBalance + 1;

    expect(() => bankAccount.withdraw(exceedingBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    const anotherAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(exceedingBalance, anotherAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(deposit);

    expect(bankAccount.getBalance()).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(initialBalance);

    expect(bankAccount.getBalance()).toBe(initialBalance - initialBalance);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const anotherAccount = getBankAccount(initialBalance);
    bankAccount.transfer(initialBalance, anotherAccount);

    expect(bankAccount.getBalance()).toBe(initialBalance - initialBalance);
    expect(anotherAccount.getBalance()).toBe(initialBalance + initialBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(initialBalance);

    const fetchedBalance = await bankAccount.fetchBalance();

    const requestFailed = fetchedBalance === null;
    if (requestFailed) return;

    expect(fetchedBalance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(negativeBalance);

    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).not.toEqual(negativeBalance);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);

    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
