#include "triangle.h"

bool is_triangle(triangle_t sides)
{
    return sides.a + sides.b > sides.c && sides.b + sides.c > sides.a && sides.c + sides.a > sides.b;
}

bool is_equilateral(triangle_t sides)
{
    if (sides.a != sides.b || sides.b != sides.c) return false;
    return sides.a + sides.b > sides.c && sides.b + sides.c > sides.a && sides.c + sides.a > sides.b;
}

bool is_isosceles(triangle_t sides)
{
    if (sides.a != sides.b && sides.b != sides.c && sides.c != sides.a) return false;
    return sides.a + sides.b > sides.c && sides.b + sides.c > sides.a && sides.c + sides.a > sides.b;
}

bool is_scalene(triangle_t sides)
{
    if (sides.a == sides.b || sides.b == sides.c || sides.c == sides.a) return false;
    return sides.a + sides.b > sides.c && sides.b + sides.c > sides.a && sides.c + sides.a > sides.b;
}