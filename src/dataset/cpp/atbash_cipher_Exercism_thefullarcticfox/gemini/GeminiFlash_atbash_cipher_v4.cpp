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
  res.reserve(str.length() * 6 / 5); // Pre-allocate space, assuming roughly 1 space per 5 chars

  int alnumcount = 0;
  for (char letter : str) {
    if (std::isalnum(letter)) {
      if (alnumcount > 0 && alnumcount % 5 == 0) {
        res.push_back(' ');
      }
      res.push_back(cipher_char(letter));
      ++alnumcount;
    }
  }
  return res;
}

std::string decode(const std::string& str) {
  std::string res;
  res.reserve(str.length()); // Pre-allocate space

  for (char letter : str) {
    if (std::isalnum(letter)) {
      res.push_back(cipher_char(letter));
    }
  }
  return res;
}

}  // namespace atbash_cipher