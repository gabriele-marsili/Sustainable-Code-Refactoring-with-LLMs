package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// NewPair generates a private and public key pair.
func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	return a, PublicKey(a, p, g)
}

// PrivateKey generates a private key in the range [2, p).
func PrivateKey(p *big.Int) *big.Int {
	return genBigRandNum(big.NewInt(2), p)
}

// PublicKey computes the public key using the private key, modulus p, and base g.
func PublicKey(private, p *big.Int, g int64) *big.Int {
	return new(big.Int).Exp(big.NewInt(g), private, p)
}

// SecretKey computes the shared secret key using the private key, the other party's public key, and modulus p.
func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}

// genBigRandNum generates a random big integer in the range [min, max).
func genBigRandNum(min, max *big.Int) *big.Int {
	bg := new(big.Int).Sub(max, min)
	n, err := rand.Int(rand.Reader, bg)
	if err != nil {
		panic(err)
	}
	return n.Add(n, min)
}