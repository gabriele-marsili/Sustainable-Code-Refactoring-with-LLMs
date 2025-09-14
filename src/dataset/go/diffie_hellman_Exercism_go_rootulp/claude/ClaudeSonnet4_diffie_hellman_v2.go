package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// Diffie-Hellman-Merkle key exchange
// Private keys should be generated randomly.

var (
	two = big.NewInt(2)
)

func PrivateKey(p *big.Int) *big.Int {
	max := new(big.Int).Sub(p, two)
	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		panic(err)
	}
	n.Add(n, two)
	return n
}

func PublicKey(a *big.Int, p *big.Int, g int64) *big.Int {
	gBig := big.NewInt(g)
	return new(big.Int).Exp(gBig, a, p)
}

func SecretKey(private1 *big.Int, public2 *big.Int, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}

func NewPair(p *big.Int, g int64) (private *big.Int, public *big.Int) {
	private = PrivateKey(p)
	public = PublicKey(private, p, g)
	return private, public
}