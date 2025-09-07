#include "./atbash_cipher.h"
#include <cctype>
#include <string>

namespace atbash {
using std::string;

static constexpr char from[] = "0123456789abcdefghijklmnopqrstuvwxyz";
static constexpr char to[] = "0123456789zyxwvutsrqponmlkjihgfedcba";

string encode(const string& text) {
  string result;
  result.reserve(text.size()); // Reserve memory to avoid reallocations
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
    result.pop_back(); // Remove trailing space
  }
  return result;
}

string decode(const string& text) {
  string result;
  result.reserve(text.size()); // Reserve memory to avoid reallocations

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