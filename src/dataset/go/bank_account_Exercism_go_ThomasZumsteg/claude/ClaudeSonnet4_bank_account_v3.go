package account

import "sync"

type Account struct {
	balance int64
	open    bool
	mu      sync.RWMutex
}

func Open(initialDeposit int64) *Account {
	if initialDeposit < 0 {
		return nil
	}
	return &Account{
		balance: initialDeposit,
		open:    true,
	}
}

func (account *Account) Close() (int64, bool) {
	account.mu.Lock()
	defer account.mu.Unlock()
	if !account.open {
		return 0, false
	}
	balance := account.balance
	account.balance = 0
	account.open = false
	return balance, true
}

func (account *Account) Balance() (int64, bool) {
	account.mu.RLock()
	defer account.mu.RUnlock()
	if !account.open {
		return 0, false
	}
	return account.balance, true
}

func (account *Account) Deposit(amount int64) (int64, bool) {
	account.mu.Lock()
	defer account.mu.Unlock()
	if !account.open || account.balance < -amount {
		return 0, false
	}
	account.balance += amount
	return account.balance, true
}