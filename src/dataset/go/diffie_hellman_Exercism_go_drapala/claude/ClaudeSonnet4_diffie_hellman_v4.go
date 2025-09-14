package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

var (
	zero = big.NewInt(0)
	one  = big.NewInt(1)
	two  = big.NewInt(2)
)

func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	A := PublicKey(a, p, g)
	return a, A
}

func PrivateKey(p *big.Int) *big.Int {
	return genBigRandNum(two, p)
}

func PublicKey(private, p *big.Int, g int64) *big.Int {
	gBig := big.NewInt(g)
	return new(big.Int).Exp(gBig, private, p)
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
	return new(big.Int).Add(n, min)
}