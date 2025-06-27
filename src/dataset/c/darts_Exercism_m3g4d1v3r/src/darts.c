#include "darts.h"

#include <math.h>

float pythagoras_theorem(float x, float y);

float pythagoras_theorem(float x, float y) {
    return (sqrt(pow(x, 2) + pow(y, 2)));
}

uint8_t score(coordinate_t landing_mark) {
    float mark_from_center = pythagoras_theorem(landing_mark.x, landing_mark.y);
    if (mark_from_center > OUTER_CIRCLE_RADIUS)
        return (0);
    else if (mark_from_center > MIDDLE_CIRCLE_RADIUS &&
             mark_from_center <= OUTER_CIRCLE_RADIUS)
        return (1);
    else if (mark_from_center > INNER_CIRCLE_RADIUS &&
             mark_from_center <= MIDDLE_CIRCLE_RADIUS)
        return (5);
    return (10);
}
