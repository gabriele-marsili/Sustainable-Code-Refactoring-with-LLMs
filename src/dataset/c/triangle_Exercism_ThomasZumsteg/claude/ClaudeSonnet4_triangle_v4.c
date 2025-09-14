#include "triangle.h"
#include <stdlib.h>

static inline int is_valid_triangle(double a, double b, double c) {
    return (a + b > c) && (a + c > b) && (b + c > a) && (a > 0) && (b > 0) && (c > 0);
}

static inline void sort_three_doubles(double *a, double *b, double *c) {
    if (*a > *b) { double temp = *a; *a = *b; *b = temp; }
    if (*b > *c) { double temp = *b; *b = *c; *c = temp; }
    if (*a > *b) { double temp = *a; *a = *b; *b = temp; }
}

int compare(const void *a, const void *b) {
    double diff = *(double *)a - *(double *)b;
    return (diff > 0) - (diff < 0);
}

Triangle_t *sort_sides(const Triangle_t *t) {
    Triangle_t *s = malloc(sizeof(Triangle_t));
    s->a = t->a;
    s->b = t->b;
    s->c = t->c;
    sort_three_doubles(&s->a, &s->b, &s->c);
    return s;
}

int is_equilateral(const Triangle_t *t) {
    return (t->a == t->b) && (t->b == t->c) && (t->a > 0);
}

int is_isosceles(const Triangle_t *t) {
    if (!is_valid_triangle(t->a, t->b, t->c)) return 0;
    return (t->a == t->b) || (t->b == t->c) || (t->a == t->c);
}

int is_scalene(const Triangle_t *t) {
    if (!is_valid_triangle(t->a, t->b, t->c)) return 0;
    return (t->a != t->b) && (t->b != t->c) && (t->a != t->c);
}