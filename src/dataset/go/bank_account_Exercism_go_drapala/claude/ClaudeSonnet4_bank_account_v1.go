package account

import (
	"sync"
)

type Account struct {
	mu      sync.RWMutex
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
	a.mu.RLock()
	defer a.mu.RUnlock()
	return a.balance, a.open
}

func (a *Account) Deposit(amount int64) (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()
	
	if !a.open {
		return a.balance, false
	}
	
	if amount < 0 && a.balance < -amount {
		return a.balance, false
	}
	
	a.balance += amount
	return a.balance, true
}

func (a *Account) CloseAndZero() {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.open = false
	a.balance = 0
}

func (a *Account) Close() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()
	
	balance := a.balance
	open := a.open
	
	a.open = false
	a.balance = 0
	
	return balance, open
}