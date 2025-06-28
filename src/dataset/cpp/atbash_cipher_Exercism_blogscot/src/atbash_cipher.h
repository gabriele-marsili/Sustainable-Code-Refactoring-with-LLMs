#ifndef ATBASH_CIPHER_H_
#define ATBASH_CIPHER_H_

#include <string>

namespace atbash {

std::string encode(const std::string&);
std::string decode(const std::string&);

}  // namespace atbash

#endif  // ATBASH_CIPHER_H_
