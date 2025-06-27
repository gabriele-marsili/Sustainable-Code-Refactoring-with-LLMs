#ifndef PASCALS_TRIANGLE_H
#define PASCALS_TRIANGLE_H

#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

uint8_t find_left_parent(uint8_t **triangle, size_t row, size_t column);
uint8_t find_right_parent(uint8_t **triangle, size_t row, size_t column);
void free_triangle(uint8_t **triangle, size_t rows);
uint8_t **create_triangle(size_t rows);

#endif
