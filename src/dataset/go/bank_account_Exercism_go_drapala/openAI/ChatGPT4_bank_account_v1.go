package account

import (
	"sync"
)

type Account struct {
	mu      sync.Mutex
	balance int64
	open    bool
}

func Open(amount int64) *Account {
	if amount < 0 {
		return nil
	}
	return &Account{
		balance: amount,
		open:    true,
	}
}

func (a *Account) Balance() (int64, bool) {
	a.mu.Lock()
	balance, open := a.balance, a.open
	a.mu.Unlock()
	return balance, open
}

func (a *Account) Deposit(amount int64) (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	if !a.open || (amount < 0 && a.balance < -amount) {
		return a.balance, false
	}
	a.balance += amount
	return a.balance, true
}

func (a *Account) Close() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	if !a.open {
		return 0, false
	}
	balance := a.balance
	a.open = false
	a.balance = 0
	return balance, true
}