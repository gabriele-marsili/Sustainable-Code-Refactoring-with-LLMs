#include "./atbash_cipher.h"
#include <cctype>
#include <string>

namespace atbash {
using std::string;

static constexpr char from[] = "0123456789abcdefghijklmnopqrstuvwxyz";
static constexpr char to[] = "0123456789zyxwvutsrqponmlkjihgfedcba";

string encode(const string& text) {
  string result;
  result.reserve(text.size());
  int letterCount = 0;

  for (char letter : text) {
    if (std::isalnum(letter)) {
      char lower = std::tolower(letter);
      size_t pos = (lower >= '0' && lower <= '9') ? lower - '0' : lower - 'a' + 10;
      result += to[pos];
      if (++letterCount % 5 == 0) {
        result += ' ';
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
      size_t pos = (letter >= '0' && letter <= '9') ? letter - '0' : letter - 'a' + 10;
      result += from[pos];
    }
  }

  return result;
}

}  // namespace atbash