#include "triangle.h"
#include <stdbool.h>

bool is_valid_triangle(triangle_t sides) {
    if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
        return false;
    }
    return (sides.a <= sides.b + sides.c) && (sides.b <= sides.a + sides.c) && (sides.c <= sides.a + sides.b);
}

bool is_equilateral(triangle_t sides) {
    if (!is_valid_triangle(sides)) {
        return false;
    }
    return (sides.a == sides.b) && (sides.b == sides.c);
}

bool is_isosceles(triangle_t sides) {
    if (!is_valid_triangle(sides)) {
        return false;
    }
    return (sides.a == sides.b) || (sides.b == sides.c) || (sides.a == sides.c);
}

bool is_scalene(triangle_t sides) {
    if (!is_valid_triangle(sides)) {
        return false;
    }
    return (sides.a != sides.b) && (sides.a != sides.c) && (sides.b != sides.c);
}