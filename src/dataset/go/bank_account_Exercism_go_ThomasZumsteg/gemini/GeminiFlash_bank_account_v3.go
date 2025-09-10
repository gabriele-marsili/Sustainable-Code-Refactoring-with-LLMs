package account

import "sync/atomic"

//Account is a bank account
type Account struct {
	balance int64
	open    int32 // Use atomic int32 for boolean flag
}

/*Open creates a bank account with a balance and doesn't allow
accounts to have a negative balance*/
func Open(initialDeposit int64) *Account {
	if initialDeposit < 0 {
		return nil
	}
	account := Account{balance: initialDeposit, open: 1} // 1 for open, 0 for closed
	return &account
}

/*Close closes a bank account, doesn't work on already closed accounts*/
func (account *Account) Close() (int64, bool) {
	if atomic.CompareAndSwapInt32(&account.open, 1, 0) {
		balance := atomic.LoadInt64(&account.balance)
		atomic.StoreInt64(&account.balance, 0)
		return balance, true
	}
	return 0, false
}

/*Balance shows the balance of a bank account, doesn't work on closed accounts*/
func (account *Account) Balance() (int64, bool) {
	if atomic.LoadInt32(&account.open) == 0 {
		return 0, false
	}
	balance := atomic.LoadInt64(&account.balance)
	return balance, true
}

/*Deposit adds money to a bank account, doesn't allow negative balances
or closed accounts*/
func (account *Account) Deposit(amount int64) (int64, bool) {
	for {
		open := atomic.LoadInt32(&account.open)
		if open == 0 {
			return 0, false
		}

		currentBalance := atomic.LoadInt64(&account.balance)
		if currentBalance < -amount {
			return 0, false
		}

		newBalance := currentBalance + amount
		if atomic.CompareAndSwapInt64(&account.balance, currentBalance, newBalance) {
			return newBalance, true
		}
	}
}