package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

// Alice and Bob use Diffie-Hellman key exchange to share secrets.
// 1. They start with prime numbers
// 2. Pick private keys
// 3. Generate and share public keys
// 4. Generate a shared secret key

// 1. They start with prime numbers
// We return (a,A) = (private, public)
func NewPair(p *big.Int, g int64) (*big.Int, *big.Int) {
	a := PrivateKey(p)
	A := PublicKey(a, p, g)
	return a, A
}

// 2. Pick private keys
func PrivateKey(p *big.Int) *big.Int {
	one := big.NewInt(1)
	limit := new(big.Int).Sub(p, one) // 1 < a < p, equivalent to 2 <= a <= p-1
	a, err := rand.Int(rand.Reader, limit)
	if err != nil {
		panic(err)
	}
	a.Add(a, one) // Ensure the private key is greater than 1
	return a
}

// 3. Generate and share public keys
func PublicKey(private, p *big.Int, g int64) *big.Int {
	// https://pkg.go.dev/math/big#Int.Exp
	base := big.NewInt(g)
	return new(big.Int).Exp(base, private, p) // (g^private) % p
}

// 4. Generate a shared secret key
func SecretKey(private1, public2, p *big.Int) *big.Int {
	return new(big.Int).Exp(public2, private1, p) // (public)^private % p
}