package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

var two = big.NewInt(2) // Reuse immutable constants to save memory allocations

func PrivateKey(p *big.Int) *big.Int {
	max := new(big.Int).Sub(p, two)
	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		panic(err)
	}
	return n.Add(n, two) // Avoid creating a new big.Int instance
}

func PublicKey(a *big.Int, p *big.Int, g int64) *big.Int {
	return new(big.Int).Exp(big.NewInt(g), a, p) // No optimization needed here
}

func SecretKey(private1 *big.Int, public2 *big.Int, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p) // No optimization needed here
}

func NewPair(p *big.Int, g int64) (private *big.Int, public *big.Int) {
	private = PrivateKey(p)
	public = PublicKey(private, p, g)
	return private, public
}