//@ts-check

export class BankAccount {
  #isOpen = false;
  #balance = 0;

  open() {
    if (this.#isOpen) throw new ValueError();
    this.#isOpen = true;
  }

  close() {
    if (!this.#isOpen) throw new ValueError();
    this.#isOpen = false;
    this.#balance = 0;
  }

  /**
   * @param {number} value
   */
  deposit(value) {
    if (!this.#isOpen || value < 0) throw new ValueError();
    this.#balance += value;
  }

  /**
   * @param {number} value
   */
  withdraw(value) {
    if (!this.#isOpen || value < 0 || value > this.#balance) throw new ValueError();
    this.#balance -= value;
  }

  get isOpen() {
    return this.#isOpen;
  }

  get balance() {
    if (!this.#isOpen) throw new ValueError();
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}