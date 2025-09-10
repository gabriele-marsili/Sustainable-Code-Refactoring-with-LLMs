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
	limit.Div(limit, big.NewInt(2)) // Reduce the range for faster generation

	n, err := rand.Int(rand.Reader, limit)
	if err != nil {
		panic(err)
	}

	return new(big.Int).Add(one, new(big.Int).Add(one, n)) // Ensure the result is within the desired range
}

func PublicKey(a *big.Int, p *big.Int, g int64) *big.Int {
	base := big.NewInt(g)
	return new(big.Int).Exp(base, a, p)
}

func SecretKey(private1 *big.Int, public2 *big.Int, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p)
}

func NewPair(p *big.Int, g int64) (private *big.Int, public *big.Int) {
	private = PrivateKey(p)
	public = PublicKey(private, p, g)
	return private, public
}