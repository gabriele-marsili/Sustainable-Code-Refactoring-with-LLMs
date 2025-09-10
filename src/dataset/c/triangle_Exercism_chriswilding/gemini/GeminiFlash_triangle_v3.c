#include "triangle.h"

bool is_triangle(triangle_t sides) {
    // Check for non-positive side lengths first. This can short-circuit invalid triangles quickly.
    if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
        return false;
    }

    // Optimized triangle inequality check.  Avoids redundant additions.
    return (sides.a < sides.b + sides.c) && (sides.b < sides.a + sides.c) && (sides.c < sides.a + sides.b);
}

bool is_equilateral(triangle_t sides) {
    // Equilateral implies a valid triangle, so check that first.
    // Then, check for equality.  This is often faster than calling is_triangle separately.
    return (sides.a > 0 && sides.a == sides.b && sides.b == sides.c);
}

bool is_isosceles(triangle_t sides) {
    if (!is_triangle(sides)) {
        return false;
    }

    // Check for at least two sides being equal.
    return (sides.a == sides.b || sides.b == sides.c || sides.a == sides.c);
}

bool is_scalene(triangle_t sides) {
    if (!is_triangle(sides)) {
        return false;
    }

    // Scalene means *no* two sides are equal.  More efficient than checking for equilateral and isosceles separately.
    return (sides.a != sides.b && sides.b != sides.c && sides.a != sides.c);
}