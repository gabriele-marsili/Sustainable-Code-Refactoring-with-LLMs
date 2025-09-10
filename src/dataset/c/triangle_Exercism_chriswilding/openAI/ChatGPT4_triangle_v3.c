#include "triangle.h"

static inline bool is_valid_triangle(int a, int b, int c)
{
    return a + b > c && b + c > a && c + a > b;
}

bool is_triangle(triangle_t sides)
{
    return is_valid_triangle(sides.a, sides.b, sides.c);
}

bool is_equilateral(triangle_t sides)
{
    return sides.a == sides.b && sides.b == sides.c && is_valid_triangle(sides.a, sides.b, sides.c);
}

bool is_isosceles(triangle_t sides)
{
    return is_valid_triangle(sides.a, sides.b, sides.c) && 
           (sides.a == sides.b || sides.b == sides.c || sides.c == sides.a);
}

bool is_scalene(triangle_t sides)
{
    return is_valid_triangle(sides.a, sides.b, sides.c) && 
           sides.a != sides.b && sides.b != sides.c && sides.c != sides.a;
}