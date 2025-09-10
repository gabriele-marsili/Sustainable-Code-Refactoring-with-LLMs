#include "triangle.h"
#include <stdbool.h>

static bool is_valid_triangle(triangle_t t) {
  return (t.a > 0 && t.b > 0 && t.c > 0) &&
         (t.a < t.b + t.c) &&
         (t.b < t.a + t.c) &&
         (t.c < t.a + t.b);
}

int is_equilateral(triangle_t t) {
  if (t.a == t.b && t.b == t.c) {
    return is_valid_triangle(t);
  }
  return 0;
}

int is_isosceles(triangle_t t) {
  if ((t.a == t.b || t.a == t.c || t.b == t.c)) {
    return is_valid_triangle(t);
  }
  return 0;
}

int is_scalene(triangle_t t) {
  if (t.a != t.b && t.a != t.c && t.b != t.c) {
    return is_valid_triangle(t);
  }
  return 0;
}