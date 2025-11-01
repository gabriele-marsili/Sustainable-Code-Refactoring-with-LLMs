#include "darts.h"

uint8_t score(coordinate_t landing_position)
{
    float x2_y2 = (landing_position.x * landing_position.x) + (landing_position.y * landing_position.y);

    if (x2_y2 <= 1.0f)
    {
        return 10;
    }
    else if (x2_y2 <= 25.0f)
    {
        return 5;
    }
    else if (x2_y2 <= 100.0f)
    {
        return 1;
    }
    return 0;
}