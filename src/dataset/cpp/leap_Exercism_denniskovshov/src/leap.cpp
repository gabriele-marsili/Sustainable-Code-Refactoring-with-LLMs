#include "leap.h"

namespace leap {
    bool is_leap_year(int year) {
        // thinking it's invalid input
        if (year < 1)
            return false;

        return year % 4 == 0
            && (year % 100 != 0 || year % 400 == 0);
    }
}  // namespace leap
