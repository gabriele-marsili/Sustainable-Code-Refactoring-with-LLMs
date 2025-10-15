class BankAccount {
    private boolean isOpened;
    private int balance;

    BankAccount() {
        isOpened = false;
        balance = 0;
    }

    void open() throws BankAccountActionInvalidException {
        if (!isOpened) {
            isOpened = true;
            balance = 0;
        } else {
            throw new BankAccountActionInvalidException("Account already open");
        }
    }

    void close() throws BankAccountActionInvalidException {
        if (isOpened) {
            this.isOpened = false;
        } else {
            throw new BankAccountActionInvalidException("Account not open");
        }
    }

    synchronized int getBalance() throws BankAccountActionInvalidException {
        if (isOpened) {
            return balance;
        } else {
            throw new BankAccountActionInvalidException("Account closed");
        }
    }

    synchronized void deposit(int amount) throws BankAccountActionInvalidException {
        if (!isOpened) {
            throw new BankAccountActionInvalidException("Account closed");
        }
        if (amount >= 0) {
            balance += amount;
        } else {
            throw new BankAccountActionInvalidException("Cannot deposit or withdraw negative amount");
        }
    }

    synchronized void withdraw(int amount) throws BankAccountActionInvalidException {
        if (!isOpened) {
            throw new BankAccountActionInvalidException("Account closed");
        }
        if (amount < 0) {
            throw new BankAccountActionInvalidException("Cannot deposit or withdraw negative amount");
        }
        if (balance >= amount) {
            balance -= amount;
        } else {
            throw new BankAccountActionInvalidException("Cannot withdraw more money than is currently in the account");
        }
    }

}