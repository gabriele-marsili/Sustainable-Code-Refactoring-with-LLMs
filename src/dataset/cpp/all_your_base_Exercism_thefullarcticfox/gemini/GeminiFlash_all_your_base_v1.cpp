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

  // Convert input digits to base-10 integer.
  uintmax_t base10_value = 0;
  for (uint digit : indigits) {
    if (base10_value > (numeric_limits<uintmax_t>::max() / inbase)) {
        //Handle potential overflow.  Return max value or throw exception.
        throw std::overflow_error("Input value too large to convert.");
    }
    base10_value = base10_value * inbase + digit;
  }

  // Convert base-10 integer to output base digits.
  if (base10_value == 0) {
    return {0};
  }

  vector<uint> outdigits;
  while (base10_value > 0) {
    outdigits.push_back(static_cast<uint>(base10_value % outbase));
    base10_value /= outbase;
  }

  reverse(outdigits.begin(), outdigits.end());
  return outdigits;
}
} // namespace all_your_base