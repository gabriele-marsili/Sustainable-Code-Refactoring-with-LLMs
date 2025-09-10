import threading

class BankAccount:
    def __init__(self):
        self._balance = 0
        self._state = False
        self._lock = threading.Lock()

    def get_balance(self):
        if not self._state:
            raise ValueError("The account is closed")
        return self._balance

    def open(self):
        if self._state:
            raise ValueError("The account is already opened")
        self._state = True

    def deposit(self, amount):
        if not self._state:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        with self._lock:
            self._balance += amount

    def withdraw(self, amount):
        if not self._state:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        with self._lock:
            if amount > self._balance:
                raise ValueError("Insufficient funds")
            self._balance -= amount

    def close(self):
        with self._lock:
            if not self._state:
                raise ValueError("The account is already closed")
            self._state = False
            self._balance = 0