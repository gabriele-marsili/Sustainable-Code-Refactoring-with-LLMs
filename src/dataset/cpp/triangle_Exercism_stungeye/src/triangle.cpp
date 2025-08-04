#include "triangle.h"

namespace triangle {
  flavor kind(double a, double b, double c) {
    if ((a <= 0) || (b <= 0) || (c <= 0)) {
      throw std::domain_error("All triangle sides must have a length greater than zero.");
     }

    if ((a + b < c) || (a + c < b) || (b + c < a)) { 
      throw std::domain_error("Combined length of any two triangle sides much be greater or equal to length of third side.");
    }

    if ((a == b) && (b == c)) {
      return flavor::equilateral;
    } else if ((a == b) || (b == c) || (a == c)) {
      return flavor::isosceles;
    }

    return flavor::scalene;
  }
}  // namespace triangle
