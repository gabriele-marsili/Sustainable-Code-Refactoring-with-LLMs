#include "grains.h"

uint64_t board[BOARD_SIZE + 1] = {0};
uint64_t total_sum = 0;

uint64_t square(uint8_t index) {
    if (index > BOARD_SIZE) return 0;
    if (board[index] == 0) {
        board[index] = (uint64_t)1 << (index - 1);
    }
    return board[index];
}

uint64_t total(void) {
    if (total_sum == 0) {
        for (uint64_t i = 1; i <= BOARD_SIZE; i++) {
            total_sum += square(i);
        }
    }
    return total_sum;
}