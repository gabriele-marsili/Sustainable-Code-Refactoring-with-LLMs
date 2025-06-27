#ifndef GRAINS_H
#define GRAINS_H

#define BOARD_1D 8
#define BOARD_SIZE BOARD_1D* BOARD_1D

#include <math.h>
#include <stdbool.h>
#include <stdint.h>

extern uint64_t board[BOARD_SIZE + 1];
extern bool board_flag;

uint64_t square(uint8_t index);
uint64_t total(void);

#endif
