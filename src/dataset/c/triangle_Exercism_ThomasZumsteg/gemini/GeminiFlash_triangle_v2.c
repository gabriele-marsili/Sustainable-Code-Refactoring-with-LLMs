#include "triangle.h"
#include <stdlib.h>
#include <stdbool.h>

Triangle_t *sort_sides(const Triangle_t *t) {
    Triangle_t *s = malloc(sizeof(Triangle_t));
    if (s == NULL) return NULL;

    double sides[3] = {t->a, t->b, t->c};

    // Manual sorting network for 3 elements (more efficient than qsort)
    if (sides[0] > sides[1]) {
        double temp = sides[0];
        sides[0] = sides[1];
        sides[1] = temp;
    }
    if (sides[0] > sides[2]) {
        double temp = sides[0];
        sides[0] = sides[2];
        sides[2] = temp;
    }
    if (sides[1] > sides[2]) {
        double temp = sides[1];
        sides[1] = sides[2];
        sides[2] = temp;
    }

    s->a = sides[0];
    s->b = sides[1];
    s->c = sides[2];
    return s;
}


int is_equilateral(const Triangle_t *t) {
    return t->a == t->b && t->b == t->c && t->a > 0;
}

int is_isosceles(const Triangle_t *t) {
    // Avoid sorting if possible
    if (t->a == t->b || t->b == t->c || t->a == t->c) {
        double sides[3] = {t->a, t->b, t->c};
        double max_side = sides[0];
        double sum_other_sides = sides[1] + sides[2];
        if (sides[1] > max_side) {
            max_side = sides[1];
            sum_other_sides = sides[0] + sides[2];
        }
        if (sides[2] > max_side) {
            max_side = sides[2];
            sum_other_sides = sides[0] + sides[1];
        }
        return sum_other_sides > max_side;
    }
    return 0;
}


int is_scalene(const Triangle_t *t) {
    double sides[3] = {t->a, t->b, t->c};
    double max_side = sides[0];
    double sum_other_sides = sides[1] + sides[2];
    if (sides[1] > max_side) {
        max_side = sides[1];
        sum_other_sides = sides[0] + sides[2];
    }
    if (sides[2] > max_side) {
        max_side = sides[2];
        sum_other_sides = sides[0] + sides[1];
    }

    if (sum_other_sides <= max_side) return 0;

    return (t->a != t->b) && (t->b != t->c) && (t->a != t->c);
}