#include "./atbash_cipher.h"
#include <cctype>
#include <string>

namespace atbash {
using std::string;

constexpr char from[] = "0123456789abcdefghijklmnopqrstuvwxyz";
constexpr char to[] = "0123456789zyxwvutsrqponmlkjihgfedcba";

string encode(const string& text) {
  string result;
  result.reserve(text.size());
  int letterCount = 0;

  for (char letter : text) {
    if (std::isalnum(letter)) {
      char lower = std::tolower(letter);
      const char* pos = std::strchr(from, lower);
      if (pos) {
        result += to[pos - from];
        if (++letterCount % 5 == 0) {
          result += ' ';
        }
      }
    }
  }

  if (!result.empty() && result.back() == ' ') {
    result.pop_back();
  }
  return result;
}

string decode(const string& text) {
  string result;
  result.reserve(text.size());

  for (char letter : text) {
    if (!std::isspace(letter)) {
      const char* pos = std::strchr(to, letter);
      if (pos) {
        result += from[pos - to];
      }
    }
  }
  return result;
}

}  // namespace atbash