#include "darts.h"

uint8_t score(coordinate_t position) 
{
    const float distance_squared = position.x * position.x + position.y * position.y;
    
    if (distance_squared <= 1.0f) return 10;
    if (distance_squared <= 25.0f) return 5;
    if (distance_squared <= 100.0f) return 1;
    
    return 0;
}