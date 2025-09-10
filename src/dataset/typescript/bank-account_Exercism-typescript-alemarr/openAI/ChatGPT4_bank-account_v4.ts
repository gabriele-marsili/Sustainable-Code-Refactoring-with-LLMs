export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}

abstract class BankAccountStatus {
  constructor(private readonly _canOperate: boolean) {}

  public allowsOperations(): boolean {
    return this._canOperate;
  }
}

class Open extends BankAccountStatus {
  constructor() {
    super(true);
  }
}

class Closed extends BankAccountStatus {
  constructor() {
    super(false);
  }
}

class Money {
  constructor(private readonly _amount: number) {}

  public add(amount: number): Money {
    return new Money(this._amount + amount);
  }

  public subtract(amount: number): Money {
    return new Money(this._amount - amount);
  }

  get amount(): number {
    return this._amount;
  }
}

class Balance {
  private _balance: Money;

  constructor(amount: number) {
    if (amount < 0) throw new ValueError();
    this._balance = new Money(amount);
  }

  public add(amount: number): void {
    if (amount < 0) throw new ValueError();
    this._balance = this._balance.add(amount);
  }

  public withdraw(amount: number): void {
    if (amount < 0 || amount > this._balance.amount) throw new ValueError();
    this._balance = this._balance.subtract(amount);
  }

  get balance(): number {
    return this._balance.amount;
  }
}

export class BankAccount {
  private _balance: Balance = new Balance(0);
  private _status: BankAccountStatus = new Closed();

  open(): void {
    if (this._status.allowsOperations()) throw new ValueError();
    this._status = new Open();
  }

  close(): void {
    if (!this._status.allowsOperations()) throw new ValueError();
    this._balance = new Balance(0);
    this._status = new Closed();
  }

  deposit(amount: number): void {
    if (!this._status.allowsOperations()) throw new ValueError();
    this._balance.add(amount);
  }

  withdraw(amount: number): void {
    if (!this._status.allowsOperations()) throw new ValueError();
    this._balance.withdraw(amount);
  }

  get balance(): number {
    if (!this._status.allowsOperations()) throw new ValueError();
    return this._balance.balance;
  }

  set balance(_: any) {
    throw new ValueError();
  }
}