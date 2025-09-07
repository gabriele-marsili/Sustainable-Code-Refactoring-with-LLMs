#include "grains.h"

static uint64_t board[BOARD_SIZE + 1] = {0};
static bool board_initialized = false;

uint64_t square(uint8_t index) {
    if (index == 0 || index > BOARD_SIZE) return 0;
    return (uint64_t)1 << (index - 1);
}

uint64_t total(void) {
    if (!board_initialized) {
        board[1] = 1;
        for (uint64_t i = 2; i <= BOARD_SIZE; i++) {
            board[i] = board[i - 1] * 2;
        }
        board_initialized = true;
    }
    return ((uint64_t)1 << BOARD_SIZE) - 1;
}