#include "gigasecond.h"

inline time_t gigasecond_after(time_t begin) {
    return begin + GIGASECOND;
}