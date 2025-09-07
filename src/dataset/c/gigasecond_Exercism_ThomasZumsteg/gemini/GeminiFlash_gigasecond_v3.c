#include "gigasecond.h"
#include <stdint.h>

time_t gigasecond_after(time_t begin) {
    return begin + GIGASECOND;
}