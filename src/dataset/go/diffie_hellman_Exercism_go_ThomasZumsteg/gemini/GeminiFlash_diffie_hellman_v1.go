package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

/*PrivateKey generates a private key greater than 2 and less than p.*/
func PrivateKey(p *big.Int) *big.Int {
	limit := new(big.Int).Sub(p, big.NewInt(2))
	key := new(big.Int)
	// Use crypto/rand for better security and performance.  No need to seed.
	// Generate a random number in the range [0, limit-1] and add 2.
	n, err := rand.Int(rand.Reader, limit)
	if err != nil {
		// Handle error appropriately.  For example, panic or return an error.
		panic(err) // Or return nil, err
	}
	return key.Add(n, big.NewInt(2))
}

/*PublicKey generates a public key*/
func PublicKey(private, p *big.Int, g int64) *big.Int {
	// Reuse the big.Int to avoid allocation.
	base := big.NewInt(g)
	return new(big.Int).Exp(base, private, p)
}

/*NewPair creates a key pair using prime numbers p and g.*/
func NewPair(p *big.Int, g int64) (private, public *big.Int) {
	private = PrivateKey(p)
	public = PublicKey(private, p, g)
	return
}

/*SecretKey creates the secret key used for encryption.*/
func SecretKey(private1, public2, p *big.Int) *big.Int {
	// Reuse the big.Int to avoid allocation.
	return new(big.Int).Exp(public2, private1, p)
}