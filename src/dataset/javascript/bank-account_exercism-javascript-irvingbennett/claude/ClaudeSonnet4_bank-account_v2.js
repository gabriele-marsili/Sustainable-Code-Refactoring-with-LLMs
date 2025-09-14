export class BankAccount {
  constructor() {
    this.balance_ = 0;
    this.status = 0; // 0: New, 1: Open, 2: Closed
  }

  open() {
    if (this.status === 1) {
      throw new ValueError("Account already open");
    }
    this.status = 1;
    if (this.status !== 2) {
      this.balance_ = 0;
    }
  }

  close() {
    if (this.status !== 1) {
      throw new ValueError("Account already closed, or not open");
    }
    const amount = this.balance_;
    this.balance_ = 0;
    this.status = 2;
    return amount;
  }

  deposit(amount) {
    if (this.status === 2) {
      throw new ValueError("Account closed");
    }
    if (amount < 0) {
      throw new ValueError("Can't deposit negative amount");
    }
    this.balance_ += amount;
  }

  withdraw(amount) {
    if (amount > this.balance_) {
      throw new ValueError('Amount larger than balance');
    }
    if (amount < 0) {
      throw new ValueError("Can't withdraw negative amount");
    }
    this.balance_ -= amount;
  }

  get balance() {
    if (this.status !== 1) {
      throw new ValueError("Closed account");
    }
    return this.balance_;
  }
}

export class ValueError extends Error {
  constructor(message) {
    super(message);
  }
}