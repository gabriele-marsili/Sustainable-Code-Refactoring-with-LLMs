#include "darts.h"

// formula : (px * px) + (py * py) <= r * r
uint8_t score(coordinate_t position) 
{
    if(position.x == 0 && position.y == 0) return 10;

    const float posX_Squared = position.x * position.x;
    const float posY_Squared = position.y * position.y;
    const float totalPos_squared = posX_Squared + posY_Squared;
    if(totalPos_squared <= 1.F)
    {
        return 10;
    }
    else if (totalPos_squared <= 25.0F)
    {
        return 5;
    }
    else if(totalPos_squared <= 100.0F)
    {
        return 1;
    }
    return 0; 
}
