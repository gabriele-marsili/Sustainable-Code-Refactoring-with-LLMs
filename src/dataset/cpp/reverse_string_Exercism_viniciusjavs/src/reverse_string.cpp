#include "reverse_string.h"
#include <algorithm>

namespace reverse_string {

string reverse_string(string str) {
  std::reverse(begin(str), end(str));
  return str;
}

} // namespace reverse_string
