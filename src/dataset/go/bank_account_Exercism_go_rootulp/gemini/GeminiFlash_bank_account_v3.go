package account

import "sync/atomic"

type Account struct {
	balance  atomic.Int64
	isClosed atomic.Bool
}

func Open(initialDeposit int64) *Account {
	if initialDeposit < 0 {
		return nil
	}
	a := &Account{}
	a.balance.Store(initialDeposit)
	return a
}

func (a *Account) Close() (payout int64, ok bool) {
	if a.isClosed.CompareAndSwap(false, true) {
		return a.balance.Load(), true
	}
	return 0, false
}

func (a *Account) Balance() (balance int64, ok bool) {
	if a.isClosed.Load() {
		return 0, false
	}
	return a.balance.Load(), true
}

func (a *Account) Deposit(amount int64) (newBalance int64, ok bool) {
	for {
		if a.isClosed.Load() {
			return 0, false
		}

		currentBalance := a.balance.Load()
		newBalance := currentBalance + amount

		if newBalance < 0 {
			return 0, false
		}

		if a.balance.CompareAndSwap(currentBalance, newBalance) {
			return newBalance, true
		}
	}
}