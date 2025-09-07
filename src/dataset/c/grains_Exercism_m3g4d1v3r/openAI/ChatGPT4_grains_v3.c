#include "grains.h"

static uint64_t board[BOARD_SIZE + 1] = {0};
static uint64_t total_sum = 0;

uint64_t square(uint8_t index) {
    if (index == 0 || index > BOARD_SIZE) return 0;
    if (board[index] == 0) {
        board[index] = (uint64_t)1 << (index - 1);
    }
    return board[index];
}

uint64_t total(void) {
    if (total_sum == 0) {
        total_sum = ((uint64_t)1 << BOARD_SIZE) - 1;
    }
    return total_sum;
}