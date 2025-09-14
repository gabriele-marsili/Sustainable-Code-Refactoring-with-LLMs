package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

var (
	one = big.NewInt(1)
	two = big.NewInt(2)
)

func PrivateKey(p *big.Int) *big.Int {
	limit := new(big.Int).Sub(p, two)
	key, _ := rand.Int(rand.Reader, limit)
	return key.Add(key, two)
}

func PublicKey(private, p *big.Int, g int64) *big.Int {
	base := big.NewInt(g)
	return new(big.Int).Exp(base, private, p)
}

func NewPair(p *big.Int, g int64) (private, public *big.Int) {
	private = PrivateKey(p)
	base := big.NewInt(g)
	public = new(big.Int).Exp(base, private, p)
	return
}

func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}