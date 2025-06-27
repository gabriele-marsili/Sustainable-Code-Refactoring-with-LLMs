#ifndef PANGRAM_H
#define PANGRAM_H

#define ALPHABET_SIZE 26

#include <stdbool.h>
#include <stddef.h>
#include <string.h>

extern bool alphabet_array[ALPHABET_SIZE];
void clear_alphabet_array();
bool is_pangram(const char *sentence);

#endif
