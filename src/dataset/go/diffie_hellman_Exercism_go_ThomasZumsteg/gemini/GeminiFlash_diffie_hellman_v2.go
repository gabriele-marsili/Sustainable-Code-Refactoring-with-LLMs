package diffiehellman

import (
	"crypto/rand"
	"math/big"
)

/*PrivateKey generates a private key greater than 1 and less than p.*/
func PrivateKey(p *big.Int) *big.Int {
	limit := new(big.Int).Sub(p, big.NewInt(2))
	key, err := rand.Int(rand.Reader, limit)
	if err != nil {
		panic(err) // Handle error appropriately in a real application
	}
	return key.Add(key, big.NewInt(2))
}

/*PublicKey generates a public key*/
func PublicKey(private, p *big.Int, g int64) *big.Int {
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
	return new(big.Int).Exp(public2, private1, p)
}