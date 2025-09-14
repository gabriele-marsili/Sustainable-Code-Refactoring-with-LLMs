#include "triangle.h"

int check_t(triangle_t t);

int is_equilateral(triangle_t t)
{
	if (t.a == t.b && t.a == t.c) {
		return (t.a > 0) && (t.a + t.a > t.a);
	}
	return 0;
}

int is_isosceles(triangle_t t)
{
	if (t.a <= 0 || t.b <= 0 || t.c <= 0) return 0;
	
	if (t.a == t.b) {
		return (t.c < t.a + t.a);
	}
	if (t.a == t.c) {
		return (t.b < t.a + t.a);
	}
	if (t.b == t.c) {
		return (t.a < t.b + t.b);
	}
	return 0;
}

int is_scalene(triangle_t t)
{
	if (t.a == t.b || t.a == t.c || t.b == t.c) return 0;
	return check_t(t);
}

int check_t(triangle_t t)
{
	return
		(t.a > 0 && t.b > 0 && t.c > 0) &&
		(t.a < t.b + t.c) &&
		(t.b < t.a + t.c) &&
		(t.c < t.a + t.b);
}