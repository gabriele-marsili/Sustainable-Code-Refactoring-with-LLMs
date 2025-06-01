import threading

class BankAccount:
    def __init__(self):
        self.balance = 0
        self.state = False
        self.lock = threading.Lock()

    def get_balance(self):
        if self.state:
           return self.balance
        raise ValueError("The account is closed")
    def open(self):
        if self.state:
           raise ValueError("The Account is already opened")
        self.state = True

    def deposit(self, amount):
        if self.state and amount > 0:
           with self.lock:
              self.balance += amount
        else:
           raise ValueError("Account is closed")

    def withdraw(self, amount):
        if self.state and amount > 0 and amount <= self.balance:
           with self.lock:
              self.balance -= amount
        else:
           raise ValueError("Account is closed")

    def close(self):
        if not self.state:
           raise ValueError("The Account is already closed")
        self.state = False
        self.balance = 0
