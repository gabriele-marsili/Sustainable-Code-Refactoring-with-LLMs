#include "perfect_numbers.h"
#include <math.h>

int classify_number(int num) {
    if (num <= 0) {
        return -1;
    }

    int sum = 1;
    for (int i = 2; i <= sqrt(num); ++i) {
        if (num % i == 0) {
            sum += i;
            if (i * i != num) {
                sum += num / i;
            }
        }
    }

    if (sum == num) {
        return 1;
    } else if (sum > num) {
        return 2;
    } else {
        return 3;
    }
}