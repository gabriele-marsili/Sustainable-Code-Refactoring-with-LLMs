export class BankAccount {
  #balance = 0;
  #isOpen = false;

  constructor() {
    this.#balance = 0;
    this.#isOpen = false;
  }

  open() {
    if (this.#isOpen) {
      throw new ValueError("Account already open");
    }
    this.#balance = 0;
    this.#isOpen = true;
  }

  close() {
    if (!this.#isOpen) {
      throw new ValueError("Account already closed, or not open");
    }
    this.#isOpen = false;
    this.#balance = 0;
  }

  deposit(amount) {
    if (!this.#isOpen) {
      throw new ValueError("Account closed");
    }
    if (amount < 0) {
      throw new ValueError("Can't deposit negative amount");
    }
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new ValueError('Amount larger than balance');
    }
    if (amount < 0) {
      throw new ValueError("Can't withdraw negative amount");
    }
    this.#balance -= amount;
  }

  get balance() {
    if (!this.#isOpen) {
      throw new ValueError("Closed account");
    }
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor(message) {
    super(message || 'Bank account error');
    this.name = 'ValueError';
  }
}