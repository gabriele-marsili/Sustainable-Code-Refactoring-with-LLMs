#include "grains.h"

uint64_t board[BOARD_SIZE + 1];
bool board_flag = false;

uint64_t square(uint8_t index) {
    if (index > BOARD_SIZE) return (0);
    if (board_flag == false) {
        total();
    }
    return board[index];
}

uint64_t total(void) {
    uint64_t sum_of_squares;
    board[1] = 1;
    sum_of_squares = board[1];
    for (uint64_t i = 2; i <= BOARD_SIZE; i++) {
        board[i] = board[i - 1] * 2;
        sum_of_squares += board[i];
    }
    board_flag = true;
    return (sum_of_squares);
}
