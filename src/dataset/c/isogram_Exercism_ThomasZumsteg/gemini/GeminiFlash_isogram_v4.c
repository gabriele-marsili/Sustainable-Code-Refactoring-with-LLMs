#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    if (word == NULL || *word == '\0') {
        return 1;
    }

    int word_length = strlen(word);
    char seen[26] = {0};
    char letter;

    for (int i = 0; i < word_length; i++) {
        letter = tolower(word[i]);
        if (letter < 'a' || letter > 'z') {
            continue;
        }

        int index = letter - 'a';
        if (seen[index]) {
            return 0;
        }
        seen[index] = 1;
    }

    return 1;
}