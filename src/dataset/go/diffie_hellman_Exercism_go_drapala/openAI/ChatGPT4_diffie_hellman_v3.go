package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	return a, PublicKey(a, p, g)
}

func PrivateKey(p *big.Int) *big.Int {
	return genBigRandNum(big.NewInt(2), p)
}

func PublicKey(private, p *big.Int, g int64) *big.Int {
	return new(big.Int).Exp(big.NewInt(g), private, p)
}

func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}

func SubtractBigBfromA(B, A *big.Int) *big.Int {
	return new(big.Int).Sub(B, A)
}

func genBigRandNum(min, max *big.Int) *big.Int {
	bg := new(big.Int).Sub(max, min)
	n, err := rand.Int(rand.Reader, bg)
	if err != nil {
		panic(err)
	}
	return n.Add(n, min)
}