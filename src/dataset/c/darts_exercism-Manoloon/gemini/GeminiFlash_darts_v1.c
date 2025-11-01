#include "darts.h"
#include <math.h>

uint8_t score(coordinate_t position) {
    float distance_squared = (position.x * position.x) + (position.y * position.y);

    if (distance_squared <= 1.0f) {
        return 10;
    } else if (distance_squared <= 25.0f) {
        return 5;
    } else if (distance_squared <= 100.0f) {
        return 1;
    } else {
        return 0;
    }
}