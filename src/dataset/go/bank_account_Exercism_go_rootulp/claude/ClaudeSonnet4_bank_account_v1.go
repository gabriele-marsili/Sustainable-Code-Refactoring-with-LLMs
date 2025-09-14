package account

import "sync/atomic"

type Account struct {
	balance  int64
	isClosed int32
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
	if !atomic.CompareAndSwapInt32(&a.isClosed, 0, 1) {
		return 0, false
	}
	return atomic.LoadInt64(&a.balance), true
}

func (a *Account) Balance() (balance int64, ok bool) {
	if atomic.LoadInt32(&a.isClosed) != 0 {
		return 0, false
	}
	return atomic.LoadInt64(&a.balance), true
}

func (a *Account) Deposit(amount int64) (newBalance int64, ok bool) {
	for {
		if atomic.LoadInt32(&a.isClosed) != 0 {
			return 0, false
		}
		
		currentBalance := atomic.LoadInt64(&a.balance)
		newBalance := currentBalance + amount
		
		if newBalance < 0 {
			return 0, false
		}
		
		if atomic.CompareAndSwapInt64(&a.balance, currentBalance, newBalance) {
			if atomic.LoadInt32(&a.isClosed) != 0 {
				return 0, false
			}
			return newBalance, true
		}
	}
}