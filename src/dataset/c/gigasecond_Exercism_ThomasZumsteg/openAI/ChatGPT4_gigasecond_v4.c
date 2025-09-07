#include "gigasecond.h"

inline time_t gigasecond_after(const time_t begin) {
    return begin + GIGASECOND;
}