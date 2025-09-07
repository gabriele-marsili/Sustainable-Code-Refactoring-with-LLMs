#include "grains.h"

uint64_t board[BOARD_SIZE];
bool board_initialized = false;
uint64_t total_grains = 0;

uint64_t square(uint8_t index) {
    if (index == 0 || index > BOARD_SIZE) return 0;

    if (!board_initialized) {
        total();
    }

    return board[index - 1];
}

uint64_t total(void) {
    if (!board_initialized) {
        board[0] = 1;
        total_grains = board[0];

        for (uint8_t i = 1; i < BOARD_SIZE; ++i) {
            board[i] = board[i - 1] * 2;
            total_grains += board[i];
        }

        board_initialized = true;
    }
    return total_grains;
}