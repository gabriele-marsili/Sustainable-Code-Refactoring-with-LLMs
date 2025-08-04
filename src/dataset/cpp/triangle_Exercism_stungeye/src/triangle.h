#if !defined(TRIANGLE_H)
#define TRIANGLE_H

#include <stdexcept>

namespace triangle {
  enum class flavor { equilateral, isosceles, scalene };
  flavor kind(double, double, double);
}  // namespace triangle

#endif // TRIANGLE_H