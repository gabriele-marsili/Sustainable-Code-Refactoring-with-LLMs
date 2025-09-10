package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// Diffie-Hellman-Merkle key exchange
// Private keys should be generated randomly.

func PrivateKey(p *big.Int) *big.Int {
	one := big.NewInt(1)
	limit := new(big.Int).Sub(p, one)

	privateKey, err := rand.Int(rand.Reader, limit)
	if err != nil {
		panic(err)
	}

	privateKey.Add(privateKey, one)
	return privateKey
}

func PublicKey(privateKey *big.Int, p *big.Int, g int64) *big.Int {
	base := big.NewInt(g)
	return new(big.Int).Exp(base, privateKey, p)
}

func SecretKey(privateKey *big.Int, publicKey *big.Int, p *big.Int) *big.Int {
	return new(big.Int).Exp(publicKey, privateKey, p)
}

func NewPair(p *big.Int, g int64) (private *big.Int, public *big.Int) {
	private = PrivateKey(p)
	public = PublicKey(private, p, g)
	return private, public
}