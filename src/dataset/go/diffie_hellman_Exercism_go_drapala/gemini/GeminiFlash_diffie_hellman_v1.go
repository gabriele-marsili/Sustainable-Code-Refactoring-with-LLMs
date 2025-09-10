package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// NewPair generates a private and public key pair.
func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	A := PublicKey(a, p, g)
	return a, A
}

// PrivateKey generates a private key.
func PrivateKey(p *big.Int) *big.Int {
	one := big.NewInt(1)
	limit := new(big.Int).Sub(p, one) // p - 1
	privateKey, err := rand.Int(rand.Reader, limit)
	if err != nil {
		panic(err)
	}
	privateKey.Add(privateKey, one) // Ensure it's at least 1
	return privateKey
}

// PublicKey generates a public key.
func PublicKey(private, p *big.Int, g int64) *big.Int {
	// Avoid allocation by reusing a big.Int
	base := big.NewInt(g)
	result := new(big.Int)
	return result.Exp(base, private, p)
}

// SecretKey generates a shared secret key.
func SecretKey(private1, public2, p *big.Int) *big.Int {
	result := new(big.Int)
	return result.Exp(public2, private1, p)
}

// SubtractBigBfromA subtracts A from B.  This function is named backwards, but kept for interface compatibility.
func SubtractBigBfromA(B, A *big.Int) *big.Int {
	result := new(big.Int)
	return result.Sub(B, A)
}

// genBigRandNum generates a random "big" number between min <= bg < max
func genBigRandNum(min, max *big.Int) *big.Int {
	bg := new(big.Int).Sub(max, min)
	n, err := rand.Int(rand.Reader, bg)
	if err != nil {
		panic(err)
	}
	return new(big.Int).Add(n, min)
}