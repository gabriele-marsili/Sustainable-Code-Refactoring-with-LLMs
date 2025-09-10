#include "triangle.h"
#include <algorithm>
#include <cmath>

namespace triangle {

void validate(double a, double b, double c) {
  if (std::isnan(a) || std::isnan(b) || std::isnan(c) ||
      std::isinf(a) || std::isinf(b) || std::isinf(c)) {
    throw std::domain_error("Sides cannot be NaN or infinite.");
  }

  if (a <= 0 || b <= 0 || c <= 0) {
    throw std::domain_error("Sides cannot be 0 or less.");
  }

  if (a > b + c || b > a + c || c > a + b) {
    throw std::domain_error("One side cannot be larger than the sum of the others.");
  }
}

triangle_kind kind(double a, double b, double c) {
  validate(a, b, c);

  if (a == b && b == c) {
    return triangle_kind::equilateral;
  } else if (a == b || a == c || b == c) {
    return triangle_kind::isosceles;
  } else {
    return triangle_kind::scalene;
  }
}

} // namespace triangle