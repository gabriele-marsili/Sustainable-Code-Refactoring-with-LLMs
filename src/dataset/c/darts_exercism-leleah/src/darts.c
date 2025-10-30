#include "darts.h"

uint8_t score (coordinate_t landing_position)
{
    uint8_t score=0;
    float circle_radius = sqrt((landing_position.x*landing_position.x)+(landing_position.y*landing_position.y));  
    if(circle_radius <= 1)
    {
        score = 10;
    }
    else if(circle_radius<=5) 
    {
        score = 5;
    }
   else  if(circle_radius<=10) 
    {
        score=1;
    }
    else
    {
        score=0;
    }
    return score;
}