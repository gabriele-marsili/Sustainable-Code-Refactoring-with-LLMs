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
    this.#isOpen = true;
    this.#balance = 0;
  }

  close() {
    if (!this.#isOpen) {
      throw new ValueError("Account already closed, or not open");
    }
    this.#isOpen = false;
    const amount = this.#balance;
    this.#balance = 0;
    return amount;
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
  constructor(message = 'Bank account error') {
    super(message);
    this.name = 'ValueError';
  }
}