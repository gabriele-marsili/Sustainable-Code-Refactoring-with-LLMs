#include "triangle.h"

bool is_triangle(triangle_t sides) {
  // Check for non-positive sides early to avoid unnecessary comparisons.
  if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
    return false;
  }
  return sides.a + sides.b > sides.c && sides.b + sides.c > sides.a &&
         sides.c + sides.a > sides.b;
}

bool is_equilateral(triangle_t sides) {
  // Only need to check two sides for equality if it's a valid triangle.
  return is_triangle(sides) && sides.a == sides.b && sides.a == sides.c;
}

bool is_isosceles(triangle_t sides) {
  if (!is_triangle(sides)) {
    return false;
  }
  // Optimized isosceles check: avoids redundant comparisons.
  return sides.a == sides.b || sides.b == sides.c || sides.a == sides.c;
}

bool is_scalene(triangle_t sides) {
  if (!is_triangle(sides)) {
    return false;
  }

  // More efficient scalene check: directly verify that no two sides are equal.
  return sides.a != sides.b && sides.a != sides.c && sides.b != sides.c;
}