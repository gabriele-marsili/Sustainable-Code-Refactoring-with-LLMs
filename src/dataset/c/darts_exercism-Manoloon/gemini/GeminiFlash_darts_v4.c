#include "darts.h"
#include <cmath>

uint8_t score(coordinate_t position) {
    float distance_squared = (position.x * position.x) + (position.y * position.y);

    if (distance_squared <= 1.0F) {
        return 10;
    } else if (distance_squared <= 25.0F) {
        return 5;
    } else if (distance_squared <= 100.0F) {
        return 1;
    } else {
        return 0;
    }
}