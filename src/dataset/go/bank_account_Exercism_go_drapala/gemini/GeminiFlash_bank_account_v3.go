package account

import (
	"sync"
	"sync/atomic"
)

type Account struct {
	mu      sync.Mutex
	balance int64
	open    atomic.Bool
}

func Open(amount int64) *Account {
	if amount < 0 {
		return nil
	}
	a := &Account{
		balance: amount,
	}
	a.open.Store(true)
	return a
}

func (a *Account) Balance() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.balance, a.open.Load()
}

func (a *Account) Deposit(amount int64) (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	if !a.open.Load() {
		return a.balance, false
	}

	if amount < 0 && a.balance < -amount {
		return a.balance, false
	}

	a.balance += amount
	return a.balance, true
}

func (a *Account) CloseAndZero() {
	a.balance = 0
	a.open.Store(false)
}

func (a *Account) Close() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	defer a.CloseAndZero()

	return a.balance, a.open.Load()
}