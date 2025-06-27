#ifndef ANAGRAM_H
#define ANAGRAM_H

#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

#define MAX_STR_LEN 20
#define ALPHABET_SIZE ('z' - 'a' + 1)

enum anagram_status { UNCHECKED = -1, NOT_ANAGRAM, IS_ANAGRAM };

struct candidate {
    enum anagram_status is_anagram;
    const char *word;
};

struct candidates {
    struct candidate *candidate;
    size_t count;
};

extern size_t subject_array[ALPHABET_SIZE];
extern size_t candidate_array[ALPHABET_SIZE];

/**
 * @description - determines if any of the words in candidate are anagrams
 *                for subject. Contents of candidate structures may be modified.
 */

bool compare_strings(const char *subject, const char *candidate);
void empty_array(size_t *array, size_t length);
void map_string_to_array(const char *str, size_t *array);
bool match_arrays();
void find_anagrams(const char *subject, struct candidates *candidates);

#endif
