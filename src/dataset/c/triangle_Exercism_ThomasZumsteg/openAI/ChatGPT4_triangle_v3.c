#include "triangle.h"

static void sort_sides_in_place(double *a, double *b, double *c) {
    if (*a > *b) { double temp = *a; *a = *b; *b = temp; }
    if (*b > *c) { double temp = *b; *b = *c; *c = temp; }
    if (*a > *b) { double temp = *a; *a = *b; *b = temp; }
}

int is_equilateral(const Triangle_t *t) {
    return t->a == t->b && t->b == t->c && t->a > 0;
}

int is_isosceles(const Triangle_t *t) {
    double a = t->a, b = t->b, c = t->c;
    sort_sides_in_place(&a, &b, &c);
    return c + b > a && (a == b || b == c);
}

int is_scalene(const Triangle_t *t) {
    double a = t->a, b = t->b, c = t->c;
    sort_sides_in_place(&a, &b, &c);
    return c + b > a && a != b && b != c;
}