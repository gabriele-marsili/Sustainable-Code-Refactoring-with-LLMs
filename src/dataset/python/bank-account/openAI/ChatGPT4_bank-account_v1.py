import threading

class BankAccount:
    def __init__(self):
        self.balance = 0
        self.state = False
        self.lock = threading.Lock()

    def get_balance(self):
        if not self.state:
            raise ValueError("The account is closed")
        return self.balance

    def open(self):
        if self.state:
            raise ValueError("The Account is already opened")
        self.state = True

    def deposit(self, amount):
        if not self.state:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        with self.lock:
            self.balance += amount

    def withdraw(self, amount):
        if not self.state:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        with self.lock:
            if amount > self.balance:
                raise ValueError("Insufficient funds")
            self.balance -= amount

    def close(self):
        if not self.state:
            raise ValueError("The Account is already closed")
        with self.lock:
            self.state = False
            self.balance = 0