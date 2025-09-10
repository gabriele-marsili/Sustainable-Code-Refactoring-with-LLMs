export class BankAccount {
  #balance = 0;
  #status = "New";

  open() {
    if (this.#status === "Open") {
      throw new ValueError("Account already open");
    }
    this.#status = "Open";
    this.#balance = 0;
  }

  close() {
    if (this.#status !== "Open") {
      throw new ValueError("Account already closed, or not open");
    }
    const amount = this.#balance;
    this.#balance = 0;
    this.#status = "Closed";
    return amount;
  }

  deposit(amount) {
    if (this.#status !== "Open") {
      throw new ValueError("Account closed");
    }
    if (amount < 0) {
      throw new ValueError("Can't deposit negative amount");
    }
    this.#balance += amount;
  }

  withdraw(amount) {
    if (this.#status !== "Open") {
      throw new ValueError("Account closed");
    }
    if (amount < 0) {
      throw new ValueError("Can't withdraw negative amount");
    }
    if (amount > this.#balance) {
      throw new ValueError("Amount larger than balance");
    }
    this.#balance -= amount;
  }

  get balance() {
    if (this.#status !== "Open") {
      throw new ValueError("Closed account");
    }
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor(message = "Bank account error") {
    super(message);
  }
}