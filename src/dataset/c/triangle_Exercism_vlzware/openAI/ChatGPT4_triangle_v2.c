#include "triangle.h"

static inline int check_t(triangle_t t)
{
	return
		(t.a > 0 && t.b > 0 && t.c > 0) &&
		(t.a < t.b + t.c) &&
		(t.b < t.a + t.c) &&
		(t.c < t.a + t.b);
}

int is_equilateral(triangle_t t)
{
	return (t.a == t.b && t.a == t.c) ? check_t(t) : 0;
}

int is_isosceles(triangle_t t)
{
	return (t.a == t.b || t.a == t.c || t.b == t.c) ? check_t(t) : 0;
}

int is_scalene(triangle_t t)
{
	return (t.a != t.b && t.a != t.c && t.b != t.c) ? check_t(t) : 0;
}