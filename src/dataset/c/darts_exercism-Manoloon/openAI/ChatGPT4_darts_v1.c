#include "darts.h"

// formula : (px * px) + (py * py) <= r * r
uint8_t score(coordinate_t position) 
{
    const float totalPos_squared = position.x * position.x + position.y * position.y;

    if(totalPos_squared <= 1.0F)
    {
        return 10;
    }
    if(totalPos_squared <= 25.0F)
    {
        return 5;
    }
    if(totalPos_squared <= 100.0F)
    {
        return 1;
    }
    return 0; 
}