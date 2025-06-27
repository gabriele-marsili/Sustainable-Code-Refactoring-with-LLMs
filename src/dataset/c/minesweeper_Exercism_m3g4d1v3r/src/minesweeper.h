#ifndef MINESWEEPER_H
#define MINESWEEPER_H
#include <stddef.h>
#include <stdlib.h>

short count_mines(const char **minefield, int i, int j, int rows, int cols);
char **annotate(const char **minefield, const size_t rows);
void free_annotation(char **annotation);

#endif
