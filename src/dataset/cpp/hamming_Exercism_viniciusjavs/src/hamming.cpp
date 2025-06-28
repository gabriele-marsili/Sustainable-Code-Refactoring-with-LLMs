#include "hamming.h"
#include <numeric>

namespace hamming {

int compute(string const &first, string const &second) {
  if (first.length() != second.length())
    throw std::domain_error{"Sequences differ in length."};

  return std::inner_product(begin(first), end(first), begin(second), 0,
                            std::plus<>{}, std::not_equal_to<>{});
}

} // namespace hamming
