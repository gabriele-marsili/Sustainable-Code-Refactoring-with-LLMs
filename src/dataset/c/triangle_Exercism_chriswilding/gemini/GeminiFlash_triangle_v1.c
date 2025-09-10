#include "triangle.h"

bool is_triangle(triangle_t sides) {
  // Check for non-positive side lengths first.  This can short-circuit invalid triangles.
  if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
    return false;
  }

  // Check triangle inequality theorem.  Rearrange for potential early exit.
  return sides.a <= sides.b + sides.c && sides.b <= sides.a + sides.c && sides.c <= sides.a + sides.b;
}

bool is_equilateral(triangle_t sides) {
  // Directly check for equality without calling is_triangle first.
  // If it's not equilateral, it can't be equilateral.
  return sides.a == sides.b && sides.b == sides.c;
}

bool is_isosceles(triangle_t sides) {
    if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
        return false;
    }
    return (sides.a == sides.b || sides.b == sides.c || sides.a == sides.c) && is_triangle(sides);
}

bool is_scalene(triangle_t sides) {
    if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
        return false;
    }
    return is_triangle(sides) && sides.a != sides.b && sides.a != sides.c && sides.b != sides.c;
}