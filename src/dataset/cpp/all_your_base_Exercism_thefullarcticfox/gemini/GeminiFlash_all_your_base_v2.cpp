#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>
#include <numeric>
#include <vector>

namespace all_your_base {
using namespace std;
using uint = unsigned int;

vector<uint> convert(uint inbase, const vector<uint>& indigits, uint outbase) {
  if (inbase < 2 || outbase < 2) {
    throw invalid_argument("base is lower than possible");
  }

  if (indigits.empty()) {
    return {0};
  }

  for (uint indigit : indigits) {
    if (indigit >= inbase) {
      throw invalid_argument("impossible number for inbase");
    }
  }

  // Convert input digits to base-10 integer
  uint base10_value = 0;
  for (uint digit : indigits) {
    if (base10_value > UINT_MAX / inbase ||
        base10_value * inbase > UINT_MAX - digit) {
      // Handle potential overflow
      throw std::overflow_error("Input value too large for unsigned int");
    }
    base10_value = base10_value * inbase + digit;
  }

  if (base10_value == 0) {
    return {0};
  }

  // Convert base-10 integer to output base
  vector<uint> result;
  while (base10_value > 0) {
    result.push_back(base10_value % outbase);
    base10_value /= outbase;
  }

  reverse(result.begin(), result.end());
  return result;
}
}  // namespace all_your_base