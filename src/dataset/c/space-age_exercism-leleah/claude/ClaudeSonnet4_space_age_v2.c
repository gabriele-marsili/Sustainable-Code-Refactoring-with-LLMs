#include "space_age.h"

static const float orbital_reciprocal[8] = {
    4.152119, 1.626078, 1.0, 0.531675, 0.084497, 0.033962, 0.011907, 0.006068
};

float age(planet_t planet, int64_t seconds)
{  
    if ((unsigned)planet < 8)
    {
        return (seconds * orbital_reciprocal[planet]) * 3.168808781402895e-8f;
    }
    return -1.0f;
}