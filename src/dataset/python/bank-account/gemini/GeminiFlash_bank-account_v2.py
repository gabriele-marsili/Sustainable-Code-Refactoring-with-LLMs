import threading

class BankAccount:
    def __init__(self):
        self._balance = 0
        self._open = False
        self._lock = threading.Lock()

    def get_balance(self):
        if not self._open:
            raise ValueError("The account is closed")
        return self._balance

    def open(self):
        if self._open:
            raise ValueError("The Account is already opened")
        self._open = True

    def deposit(self, amount):
        if not self._open:
            raise ValueError("Account is closed")
        if amount <= 0:
            return  # Or raise ValueError, depending on desired behavior

        with self._lock:
            self._balance += amount

    def withdraw(self, amount):
        if not self._open:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Amount must be positive")
        with self._lock:
            if amount > self._balance:
                raise ValueError("Insufficient funds")
            self._balance -= amount

    def close(self):
        if not self._open:
            raise ValueError("The Account is already closed")
        self._open = False
        self._balance = 0