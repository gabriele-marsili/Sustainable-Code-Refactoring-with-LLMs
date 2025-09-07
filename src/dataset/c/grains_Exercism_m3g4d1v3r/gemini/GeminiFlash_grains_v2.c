#include "grains.h"

uint64_t square(uint8_t index) {
    if (index == 0 || index > BOARD_SIZE) {
        return 0;
    }
    return ((uint64_t)1) << (index - 1);
}

uint64_t total(void) {
    uint64_t sum = 0;
    uint64_t current_square = 1;
    for (int i = 0; i < BOARD_SIZE; ++i) {
        sum += current_square;
        if (i < BOARD_SIZE -1) {
            current_square *= 2;
        }
    }
    return sum;
}