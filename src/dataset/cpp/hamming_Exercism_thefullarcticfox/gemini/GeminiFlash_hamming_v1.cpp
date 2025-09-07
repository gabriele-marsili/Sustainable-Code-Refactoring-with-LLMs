#include "hamming.h"
#include <stdexcept>
#include <string>

namespace hamming {
int compute(const std::string& s1, const std::string& s2) {
  if (s1.size() != s2.size()) {
    throw std::domain_error("Unequal");
  }

  int dist = 0;
  for (size_t i = 0; i < s1.size(); ++i) {
    if (s1[i] != s2[i]) {
      ++dist;
    }
  }
  return dist;
}
} // namespace hamming