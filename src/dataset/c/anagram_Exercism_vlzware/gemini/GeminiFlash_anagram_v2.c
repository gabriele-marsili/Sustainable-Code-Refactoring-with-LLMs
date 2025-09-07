/**
 * Chech for anagrams:
 *
 * Optimized version using character frequency counting.
 * Works for ASCII characters.  For full Unicode support, a larger
 * frequency table and potentially a different data structure (e.g., hash map)
 * would be needed.
 */

#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26  // Assuming only lowercase English letters

/*
 * Calculates the frequency of each character in a string.
 * Converts the string to lowercase in place.
 */
static void calculate_frequency(const char *str, int *frequency) {
  for (int i = 0; i < ALPHABET_SIZE; ++i) {
    frequency[i] = 0;
  }

  for (const char *p = str; *p; ++p) {
    char c = tolower(*p);
    if (c >= 'a' && c <= 'z') {
      frequency[c - 'a']++;
    }
  }
}

void anagrams_for(const char *word, struct candidates *candidates) {
  if (!word || !candidates) {
    return;
  }

  int word_frequency[ALPHABET_SIZE];
  calculate_frequency(word, word_frequency);

  size_t word_len = strlen(word); // Cache the length

  for (size_t i = 0; i < candidates->count; ++i) {
    struct candidate *candidate = &candidates->candidate[i];
    const char *candidate_str = candidate->candidate;
    size_t candidate_len = strlen(candidate_str);

    if (candidate_len != word_len) {
      candidate->is_anagram = NOT_ANAGRAM;
      continue;
    }

    int candidate_frequency[ALPHABET_SIZE];
    calculate_frequency(candidate_str, candidate_frequency);

    bool is_anagram = true;
    for (int j = 0; j < ALPHABET_SIZE; ++j) {
      if (word_frequency[j] != candidate_frequency[j]) {
        is_anagram = false;
        break;
      }
    }

    candidate->is_anagram = is_anagram ? IS_ANAGRAM : NOT_ANAGRAM;
  }
}