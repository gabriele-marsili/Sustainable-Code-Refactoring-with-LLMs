#include "pangram.h"
#include <ctype.h>
#include <string.h>
#define LETTERS 26

int letter(char c) {
    if (!isalpha(c)) {
        return -1;
    }
    return tolower(c) - 'a';
}

int is_pangram(const char *words) {
    if (words == NULL) {
        return 0;
    }

    int letters[LETTERS] = {0};
    int unique_letters_count = 0;

    for (const char *p = words; *p != '\0'; ++p) {
        int letter_idx = letter(*p);

        if (letter_idx >= 0) {
            if (letters[letter_idx] == 0) {
                letters[letter_idx] = 1;
                unique_letters_count++;

                if (unique_letters_count == LETTERS) {
                    return 1;
                }
            }
        }
    }

    return (unique_letters_count == LETTERS);
}