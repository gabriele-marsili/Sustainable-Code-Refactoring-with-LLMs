export class BankAccount {
  constructor() {
    this.balance_ = 0;
    this.status = "New";
  }

  open() {
    if (this.status === "Open") {
      throw new ValueError("Account already open");
    }
    this.status = "Open";
    this.balance_ = 0;
  }

  close() {
    if (this.status !== "Open") {
      throw new ValueError("Account already closed, or not open");
    }
    const amount = this.balance_;
    this.balance_ = 0;
    this.status = "Closed";
    return amount;
  }

  deposit(amount) {
    if (this.status === "Closed") {
      throw new ValueError("Account closed");
    }
    if (amount < 0) {
      throw new ValueError("Can't deposit negative amount");
    }
    this.balance_ += amount;
  }

  withdraw(amount) {
    if (amount < 0) {
      throw new ValueError("Can't withdraw negative amount");
    }
    if (amount > this.balance_) {
      throw new ValueError('Amount larger than balance');
    }
    this.balance_ -= amount;
  }

  get balance() {
    if (this.status !== "Open") {
      throw new ValueError("Closed account");
    }
    return this.balance_;
  }
}

export class ValueError extends Error {
  constructor(message) {
    super(message || 'Bank account error');
  }
}