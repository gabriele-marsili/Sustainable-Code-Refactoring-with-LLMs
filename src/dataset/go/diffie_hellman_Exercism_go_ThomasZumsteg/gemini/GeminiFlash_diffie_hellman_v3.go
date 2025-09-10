package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

/*PrivateKey generates a private key greater than 2 and less than p.*/
func PrivateKey(p *big.Int) *big.Int {
	key := new(big.Int)
	limit := new(big.Int).Sub(p, big.NewInt(2))
	// Use crypto/rand for better security and performance.
	// Avoid seeding with time.Now().UnixNano() as it's predictable.
	n, err := rand.Int(rand.Reader, limit)
	if err != nil {
		// Handle error appropriately, e.g., return nil and an error.
		// For simplicity in this example, we panic.  In production,
		// handle this gracefully.
		panic(err)
	}
	return key.Add(n, big.NewInt(2))
}

/*PublicKey generates a public key*/
func PublicKey(private, p *big.Int, g int64) *big.Int {
	base := new(big.Int).SetInt64(g)
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
	return new(big.Int).Exp(public2, private1, p)
}