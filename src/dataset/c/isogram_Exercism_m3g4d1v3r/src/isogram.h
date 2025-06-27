#ifndef ISOGRAM_H
#define ISOGRAM_H

#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#define ALPHABET_SIZE 26

extern size_t alphabet_array[ALPHABET_SIZE];
void clear_array(size_t *input_array, size_t length);
bool is_isogram(const char phrase[]);

#endif
