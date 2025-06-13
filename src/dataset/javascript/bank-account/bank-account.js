//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class BankAccount {
  balance_ = 0
  constructor() {
    this.balance_ = 0;
    this.status = "New"
  }

  open() {
    if (this.status == "Open") {
      throw new ValueError("Account already open")
    } else if (this.status == "Closed") {
      this.status = "Open"
    } else {
      this.status = "Open"
      this.balance_ = 0;
    }
  }

  close() {
    if (this.status != "Open") { // (this.status == "Closed" ||this.status == "New") {
      throw new ValueError("Account already closed, or not open")
    } else {
      // console.log(this.status)
      let amount = this.balance_;
      this.balance_ = 0;
      this.status = "Closed"
      return amount;
    }
  }

  deposit(amount) {
    if (this.status == "Closed") {
      throw new ValueError("Account closed")
    } else if (amount < 0) {
      throw new ValueError("Can't deposit negative amount");
    }
    this.balance_ += amount;
  }

  withdraw(amount) {
    if (amount > this.balance_) {
      throw new ValueError('Amount larger than balance');
    } else if (amount < 0) {
      throw new ValueError("Can't withdraw negative amount");
    }
    this.balance_ -= amount;
    
  }

  get balance() {
    // console.log("Get balance "+this.status)
    if (this.status != "Open") {
      console.log("Get balance "+this.status)
      throw new ValueError("Closed account");
      // return 0
    } else {
      console.log("Get balance "+this.status)
      console.log(this.balance_)
      return this.balance_;
    }
    
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
