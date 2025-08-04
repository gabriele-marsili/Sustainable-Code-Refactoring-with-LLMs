#if !defined(ATBASH_CIPHER_H)
#define ATBASH_CIPHER_H
#include <string>

namespace atbash_cipher {
	std::string	encode(const std::string& str);
	std::string	decode(const std::string& str);
}  // namespace atbash_cipher

#endif // ATBASH_CIPHER_H
