#include "triangle.h"

static inline int is_valid_triangle(triangle_t t);

int is_equilateral(triangle_t t)
{
	return (t.a == t.b && t.b == t.c) ? is_valid_triangle(t) : 0;
}

int is_isosceles(triangle_t t)
{
	return (t.a == t.b || t.a == t.c || t.b == t.c) ? is_valid_triangle(t) : 0;
}

int is_scalene(triangle_t t)
{
	return (t.a != t.b && t.a != t.c && t.b != t.c) ? is_valid_triangle(t) : 0;
}

static inline int is_valid_triangle(triangle_t t)
{
	if (t.a <= 0 || t.b <= 0 || t.c <= 0) return 0;
	return (t.a < t.b + t.c) && (t.b < t.a + t.c) && (t.c < t.a + t.b);
}