package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

var two = big.NewInt(2)

func PrivateKey(p *big.Int) *big.Int {
	max := new(big.Int).Sub(p, two)
	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		panic(err)
	}
	return n.Add(n, two)
}

func PublicKey(a, p *big.Int, g int64) *big.Int {
	return new(big.Int).Exp(big.NewInt(g), a, p)
}

func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}

func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	private := PrivateKey(p)
	return private, PublicKey(private, p, g)
}