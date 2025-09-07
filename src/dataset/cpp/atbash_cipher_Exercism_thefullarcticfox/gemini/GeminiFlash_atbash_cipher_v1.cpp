#include "atbash_cipher.h"
#include <algorithm>
#include <cctype>

namespace atbash_cipher {

char cipher_char(char c) {
  if (std::isalpha(c)) {
    return 'z' - std::tolower(c) + 'a';
  }
  return c;
}

std::string encode(const std::string& str) {
  std::string res;
  res.reserve(str.length() * 2 / 5 + 1); // Pre-allocate memory

  int alnum_count = 0;
  for (char letter : str) {
    if (std::isalnum(letter)) {
      if (alnum_count > 0 && alnum_count % 5 == 0) {
        res.push_back(' ');
      }
      res.push_back(cipher_char(letter));
      alnum_count++;
    }
  }
  return res;
}

std::string decode(const std::string& str) {
  std::string res;
  res.reserve(str.length()); // Pre-allocate memory

  for (char letter : str) {
    if (std::isalnum(letter)) {
      res.push_back(cipher_char(letter));
    }
  }
  return res;
}

}  // namespace atbash_cipher