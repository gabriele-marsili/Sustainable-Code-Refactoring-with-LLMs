#include "triangle.h"

void sort_sides_in_place(double sides[3]) {
    if (sides[0] > sides[1]) { double temp = sides[0]; sides[0] = sides[1]; sides[1] = temp; }
    if (sides[1] > sides[2]) { double temp = sides[1]; sides[1] = sides[2]; sides[2] = temp; }
    if (sides[0] > sides[1]) { double temp = sides[0]; sides[0] = sides[1]; sides[1] = temp; }
}

int is_equilateral(const Triangle_t *t) {
    return t->a == t->b && t->b == t->c && t->a > 0;
}

int is_isosceles(const Triangle_t *t) {
    double sides[3] = { t->a, t->b, t->c };
    sort_sides_in_place(sides);
    return sides[2] < sides[0] + sides[1] && (sides[0] == sides[1] || sides[1] == sides[2]);
}

int is_scalene(const Triangle_t *t) {
    double sides[3] = { t->a, t->b, t->c };
    sort_sides_in_place(sides);
    return sides[2] < sides[0] + sides[1] && sides[0] != sides[1] && sides[1] != sides[2];
}