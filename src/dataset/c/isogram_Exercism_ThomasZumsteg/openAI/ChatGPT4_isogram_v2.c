#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    int seen[26] = {0}; // Array to track occurrences of letters
    char letter;
    for (int i = 0; word[i] != '\0'; i++) {
        letter = tolower(word[i]);
        if (letter >= 'a' && letter <= 'z') {
            if (seen[letter - 'a']++)
                return 0;
        }
    }
    return 1;
}