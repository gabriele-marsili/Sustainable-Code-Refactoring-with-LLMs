#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    int seen[26] = {0};
    char letter;
    
    for (int i = 0; word[i] != '\0'; i++) {
        letter = tolower(word[i]);
        if (letter < 'a' || letter > 'z')
            continue;
        
        int index = letter - 'a';
        if (seen[index])
            return 0;
        seen[index] = 1;
    }
    return 1;
}