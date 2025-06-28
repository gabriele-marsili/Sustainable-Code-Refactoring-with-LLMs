
#include "./atbash_cipher.h"
#include <boost/algorithm/string.hpp>
#include <sstream>

namespace atbash {
using std::string;

static const string from = "0123456789abcdefghijklmnopqrstuvwxyz";
static const string to = "0123456789zyxwvutsrqponmlkjihgfedcba";

string encode(const string& text) {
  auto letterCount{0};
  std::stringstream ss;

  for (auto& letter : text) {
    auto pos = from.find(tolower(letter));
    if (pos == string::npos) continue;
    ss << to[pos];
    if (++letterCount % 5 == 0) {
      ss << " ";
    }
  }
  string s = ss.str();
  boost::trim_right(s);
  return s;
}

string decode(const string& text) {
  std::stringstream ss;

  for (auto& letter : text) {
    if (isspace(letter)) continue;
    ss << from[to.find(letter)];
  }
  return ss.str();
}

}  // namespace atbash
