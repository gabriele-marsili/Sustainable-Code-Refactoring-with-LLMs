#include "grains.h"

static uint64_t board[BOARD_SIZE + 1] = {0};
static bool board_initialized = false;

uint64_t square(uint8_t index) {
    if (index > BOARD_SIZE) return 0;
    if (!board_initialized) total();
    return board[index];
}

uint64_t total(void) {
    if (board_initialized) return board[BOARD_SIZE];
    
    uint64_t current = 1;
    uint64_t sum_of_squares = 0;
    for (uint64_t i = 1; i <= BOARD_SIZE; i++) {
        board[i] = current;
        sum_of_squares += current;
        current <<= 1; // Efficiently multiply by 2 using bit shift
    }
    board_initialized = true;
    return sum_of_squares;
}