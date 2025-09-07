#include "./atbash_cipher.h"
#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

namespace atbash {
using std::string;

static const string from = "0123456789abcdefghijklmnopqrstuvwxyz";
static const string to = "0123456789zyxwvutsrqponmlkjihgfedcba";

string encode(const string& text) {
  std::vector<char> encoded;
  encoded.reserve(text.length() * 6 / 5 + 1); // Pre-allocate space

  int letter_count = 0;
  for (char letter : text) {
    char lower_letter = std::tolower(letter);
    size_t pos = from.find(lower_letter);
    if (pos != string::npos) {
      encoded.push_back(to[pos]);
      if (++letter_count % 5 == 0) {
        encoded.push_back(' ');
      }
    }
  }

  if (!encoded.empty() && encoded.back() == ' ') {
    encoded.pop_back(); // Remove trailing space
  }

  return string(encoded.begin(), encoded.end());
}

string decode(const string& text) {
  std::vector<char> decoded;
  decoded.reserve(text.length());

  for (char letter : text) {
    if (std::isspace(letter)) continue;
    size_t pos = to.find(letter);
    if (pos != string::npos) {
      decoded.push_back(from[pos]);
    }
  }

  return string(decoded.begin(), decoded.end());
}

}  // namespace atbash