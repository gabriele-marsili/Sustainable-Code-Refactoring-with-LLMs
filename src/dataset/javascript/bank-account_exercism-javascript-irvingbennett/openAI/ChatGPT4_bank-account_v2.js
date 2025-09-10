export class BankAccount {
  constructor() {
    this._balance = 0;
    this._status = "New";
  }

  open() {
    if (this._status === "Open") {
      throw new ValueError("Account already open");
    }
    this._status = "Open";
    this._balance = 0;
  }

  close() {
    if (this._status !== "Open") {
      throw new ValueError("Account already closed, or not open");
    }
    this._status = "Closed";
    const amount = this._balance;
    this._balance = 0;
    return amount;
  }

  deposit(amount) {
    if (this._status !== "Open") {
      throw new ValueError("Account closed");
    }
    if (amount <= 0) {
      throw new ValueError("Deposit amount must be positive");
    }
    this._balance += amount;
  }

  withdraw(amount) {
    if (this._status !== "Open") {
      throw new ValueError("Account closed");
    }
    if (amount <= 0) {
      throw new ValueError("Withdraw amount must be positive");
    }
    if (amount > this._balance) {
      throw new ValueError("Amount larger than balance");
    }
    this._balance -= amount;
  }

  get balance() {
    if (this._status !== "Open") {
      throw new ValueError("Account is not open");
    }
    return this._balance;
  }
}

export class ValueError extends Error {
  constructor(message = "Bank account error") {
    super(message);
  }
}