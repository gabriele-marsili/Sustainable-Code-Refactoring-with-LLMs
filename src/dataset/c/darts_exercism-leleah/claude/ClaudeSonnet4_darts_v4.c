#include "darts.h"

uint8_t score (coordinate_t landing_position)
{
    float radius_squared = (landing_position.x * landing_position.x) + (landing_position.y * landing_position.y);
    
    if (radius_squared <= 1.0f) {
        return 10;
    }
    if (radius_squared <= 25.0f) {
        return 5;
    }
    if (radius_squared <= 100.0f) {
        return 1;
    }
    return 0;
}