package account

import (
	"sync"
)

// Mutex references
// https://go.dev/tour/concurrency/9
// https://gobyexample.com/mutexes

type Account struct {
	mu      sync.Mutex // Declare mutex
	balance int64
	open    bool
}

func Open(amount int64) *Account {
	if amount < 0 {
		return nil
	}

	a := &Account{
		balance: amount,
		open:    true,
	}
	return a
}

func (a *Account) Balance() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.balance, a.open
}

func (a *Account) Deposit(amount int64) (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	if !a.open {
		return a.balance, false
	}

	if a.balance+amount < 0 {
		return a.balance, false
	}

	a.balance += amount
	return a.balance, true
}

func (a *Account) Close() (int64, bool) {
	a.mu.Lock()
	defer a.mu.Unlock()

	balance := a.balance
	isOpen := a.open
	a.balance = 0
	a.open = false

	return balance, isOpen
}