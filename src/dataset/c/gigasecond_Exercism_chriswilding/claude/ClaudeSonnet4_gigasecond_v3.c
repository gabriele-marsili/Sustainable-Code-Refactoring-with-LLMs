#include "gigasecond.h"

#define GIGASECOND 1000000000L

time_t gigasecond_after(time_t time)
{
    return time + GIGASECOND;
}