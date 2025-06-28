#include "triangle.h"
#include <algorithm>
#include <cfloat>
#include <cmath>
#include <stdexcept>

namespace triangle {
using std::begin;
using std::domain_error;
using std::end;
using std::sort;

// Float values are close enough to be considered equal
bool is_equal(float value1, float value2) {
  return abs(value1 - value2) < FLT_EPSILON;
}

Triangle_Type kind(const float side1, const float side2, const float side3) {
  if (side1 <= 0 || side2 <= 0 || side3 <= 0) {
    throw domain_error("Invalid triangle dimensions!");
  }

  float sides[3] = {side1, side2, side3};
  sort(begin(sides), end(sides));
  auto a = sides[0];
  auto b = sides[1];
  auto c = sides[2];
  if (a + b < c) {
    throw domain_error("Invalid triangle dimensions!");
  } else if (is_equal(a, b) && is_equal(b, c)) {
    return Triangle_Type::equilateral;
  } else if (is_equal(a, b) || is_equal(b, c)) {
    return Triangle_Type::isosceles;
  }
  return Triangle_Type::scalene;
}
}  // namespace triangle
