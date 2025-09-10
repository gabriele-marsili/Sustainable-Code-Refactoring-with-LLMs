#include "triangle.h"
#include <stdlib.h>
#include <stdbool.h>

Triangle_t *sort_sides(const Triangle_t *t) {
    Triangle_t *s = malloc(sizeof(Triangle_t));
    if (!s) return NULL;

    double a = t->a, b = t->b, c = t->c;

    if (a > b) { double temp = a; a = b; b = temp; }
    if (a > c) { double temp = a; a = c; c = temp; }
    if (b > c) { double temp = b; b = c; c = temp; }

    s->a = a; s->b = b; s->c = c;
    return s;
}

int is_equilateral(const Triangle_t *t) {
    return t->a == t->b && t->b == t->c && t->a > 0;
}

int is_isosceles(const Triangle_t *t) {
    return (t->a == t->b || t->b == t->c || t->a == t->c) && (t->a + t->b > t->c) && (t->a + t->c > t->b) && (t->b + t->c > t->a);
}

int is_scalene(const Triangle_t *t) {
    return t->a != t->b && t->b != t->c && t->a != t->c && (t->a + t->b > t->c) && (t->a + t->c > t->b) && (t->b + t->c > t->a);
}