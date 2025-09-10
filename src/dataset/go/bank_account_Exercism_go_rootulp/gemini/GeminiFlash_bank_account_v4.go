package account

import "sync"

type Account struct {
	balance  int64
	isClosed bool
	mu       sync.RWMutex
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
	defer a.mu.Unlock()
	if a.isClosed {
		return 0, false
	}
	a.isClosed = true
	payout = a.balance
	a.balance = 0 // Prevent potential reuse of balance after close
	return payout, true
}

func (a *Account) Balance() (balance int64, ok bool) {
	a.mu.RLock()
	defer a.mu.RUnlock()
	if a.isClosed {
		return 0, false
	}
	return a.balance, true
}

func (a *Account) Deposit(amount int64) (newBalance int64, ok bool) {
	a.mu.Lock()
	defer a.mu.Unlock()
	if a.isClosed {
		return 0, false
	}
	if a.balance+amount < 0 {
		return 0, false
	}
	a.balance += amount
	return a.balance, true
}