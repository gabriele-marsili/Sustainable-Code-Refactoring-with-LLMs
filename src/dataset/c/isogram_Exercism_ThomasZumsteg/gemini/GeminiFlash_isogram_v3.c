#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include "isogram.h"

bool isIsogram(char *word) {
    if (word == NULL) {
        return true;
    }

    int word_length = strlen(word);
    if (word_length <= 1) {
        return true;
    }

    bool seen[26] = {false};

    for (int i = 0; i < word_length; i++) {
        char letter = tolower(word[i]);
        if (letter >= 'a' && letter <= 'z') {
            int index = letter - 'a';
            if (seen[index]) {
                return false;
            }
            seen[index] = true;
        }
    }

    return true;
}