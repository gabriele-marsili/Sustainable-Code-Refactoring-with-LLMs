#include "triangle.h"

int is_valid_triangle(triangle_t sides) {
    if (sides.a <= 0 || sides.b <= 0 || sides.c <= 0) {
        return 0;
    }
    return (sides.a <= sides.b + sides.c) && (sides.b <= sides.a + sides.c) && (sides.c <= sides.a + sides.b);
}

int is_equilateral(triangle_t sides) {
    return is_valid_triangle(sides) && (sides.a == sides.b) && (sides.b == sides.c);
}

int is_isosceles(triangle_t sides) {
    if (!is_valid_triangle(sides)) {
        return 0;
    }
    return (sides.a == sides.b || sides.b == sides.c || sides.a == sides.c);
}

int is_scalene(triangle_t sides) {
    return is_valid_triangle(sides) && (sides.a != sides.b) && (sides.a != sides.c) && (sides.b != sides.c);
}