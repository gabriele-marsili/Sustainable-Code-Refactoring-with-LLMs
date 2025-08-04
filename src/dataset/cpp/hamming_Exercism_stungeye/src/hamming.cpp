#include "hamming.h"
#include <functional>
#include <numeric>

namespace hamming {
  int compute(const std::string& strand1, const std::string& strand2) {
    if (strand1.length() != strand2.length()) {
      throw std::domain_error("Strand lengths do not match.");
    }

    return std::inner_product(strand1.begin(), strand1.end(), strand2.begin(),
                              0, std::plus<>(), std::not_equal_to<>()
    );
  }
} // namespace hamming
