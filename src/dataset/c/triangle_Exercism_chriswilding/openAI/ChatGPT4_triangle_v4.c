#include "triangle.h"

bool is_triangle(triangle_t sides)
{
    int ab = sides.a + sides.b;
    int bc = sides.b + sides.c;
    int ca = sides.c + sides.a;
    return ab > sides.c && bc > sides.a && ca > sides.b;
}

bool is_equilateral(triangle_t sides)
{
    return sides.a == sides.b && sides.b == sides.c && is_triangle(sides);
}

bool is_isosceles(triangle_t sides)
{
    return (sides.a == sides.b || sides.b == sides.c || sides.c == sides.a) && is_triangle(sides);
}

bool is_scalene(triangle_t sides)
{
    return sides.a != sides.b && sides.b != sides.c && sides.c != sides.a && is_triangle(sides);
}