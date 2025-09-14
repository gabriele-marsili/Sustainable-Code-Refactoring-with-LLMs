export class ValueError extends Error {
  constructor() {
    super('Bank account error')
  }
}

export class BankAccount {
  private _balance: number = 0;
  private _isOpen: boolean = false;

  open(): void {
    if (this._isOpen) {
      throw new ValueError();
    }
    this._isOpen = true;
  }

  close(): void {
    if (!this._isOpen) {
      throw new ValueError();
    }
    this._balance = 0;
    this._isOpen = false;
  }

  deposit(amount: number): void {
    if (!this._isOpen) {
      throw new ValueError();
    }
    if (amount < 0) {
      throw new ValueError();
    }
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (!this._isOpen) {
      throw new ValueError();
    }
    if (amount < 0 || amount > this._balance) {
      throw new ValueError();
    }
    this._balance -= amount;
  }

  get balance(): number {
    if (!this._isOpen) {
      throw new ValueError();
    }
    return this._balance;
  }

  set balance(balance: any) {
    throw new ValueError();
  }
}