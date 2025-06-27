#include "darts.h"

#include <math.h>

uint8_t score(coordinate_t coordinate)
{
  double radius = sqrt(pow(coordinate.x, 2) + pow(coordinate.y, 2));

  if (radius <= 1L)
  {
    return 10;
  }
  else if (radius <= 5L)
  {
    return 5;
  }
  else if (radius <= 10L)
  {
    return 1;
  }

  return 0;
}
