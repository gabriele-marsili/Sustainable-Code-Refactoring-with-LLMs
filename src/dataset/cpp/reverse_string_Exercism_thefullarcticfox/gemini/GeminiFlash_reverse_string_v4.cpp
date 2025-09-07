#include "reverse_string.h"
#include <algorithm>

namespace reverse_string {
std::string reverse_string(const std::string& str) {
  std::string reversed_str;
  reversed_str.reserve(str.length());
  std::copy(str.rbegin(), str.rend(), std::back_inserter(reversed_str));
  return reversed_str;
}
}  // namespace reverse_string