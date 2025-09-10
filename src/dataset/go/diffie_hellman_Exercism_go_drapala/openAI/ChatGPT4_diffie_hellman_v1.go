package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// 1. They start with prime numbers
// We return (a,A) = (private, public)
func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	return a, PublicKey(a, p, g)
}

// 2. Pick private keys
func PrivateKey(p *big.Int) *big.Int {
	return genBigRandNum(big.NewInt(2), p) // 2 <= a < p
}

// 3. Generate and share public keys
func PublicKey(private, p *big.Int, g int64) *big.Int {
	return new(big.Int).Exp(big.NewInt(g), private, p) // (g^private) % p
}

// 4. Generate a shared secret key
func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p) // (public)^private % p
}

// Utility functions
// Generates a random "big" number between min <= bg < max
func genBigRandNum(min, max *big.Int) *big.Int {
	bg := new(big.Int).Sub(max, min)
	n, err := rand.Int(rand.Reader, bg)
	if err != nil {
		panic(err)
	}
	return n.Add(n, min)
}