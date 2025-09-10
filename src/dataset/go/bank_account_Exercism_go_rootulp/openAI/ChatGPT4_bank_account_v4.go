package account

import "sync"

type Account struct {
	balance  int64
	isClosed bool
	mu       sync.Mutex
}

func Open(initialDeposit int64) *Account {
	if initialDeposit < 0 {
		return nil
	}
	return &Account{
		balance: initialDeposit,
	}
}

func (a *Account) Close() (payout int64, ok bool) {
	a.mu.Lock()
	if a.isClosed {
		a.mu.Unlock()
		return 0, false
	}
	a.isClosed = true
	payout = a.balance
	a.mu.Unlock()
	return payout, true
}

func (a *Account) Balance() (balance int64, ok bool) {
	a.mu.Lock()
	if a.isClosed {
		a.mu.Unlock()
		return 0, false
	}
	balance = a.balance
	a.mu.Unlock()
	return balance, true
}

func (a *Account) Deposit(amount int64) (newBalance int64, ok bool) {
	a.mu.Lock()
	if a.isClosed || a.balance+amount < 0 {
		a.mu.Unlock()
		return 0, false
	}
	a.balance += amount
	newBalance = a.balance
	a.mu.Unlock()
	return newBalance, true
}