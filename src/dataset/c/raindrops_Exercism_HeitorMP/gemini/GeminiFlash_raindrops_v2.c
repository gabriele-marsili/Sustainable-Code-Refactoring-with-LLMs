#include "raindrops.h"
#include <string.h>
#include <stdio.h>
#include <stdbool.h> // Include for bool type

char *convert(char result[], int drops)
{
    // Use a pointer to keep track of the current write position in result
    char *current_pos = result;
    bool has_sound = false;

    if (drops % 3 == 0) {
        strcpy(current_pos, "Pling");
        current_pos += 5; // Advance pointer by length of "Pling"
        has_sound = true;
    }

    if (drops % 5 == 0) {
        strcpy(current_pos, "Plang");
        current_pos += 5; // Advance pointer by length of "Plang"
        has_sound = true;
    }

    if (drops % 7 == 0) {
        strcpy(current_pos, "Plong");
        current_pos += 5; // Advance pointer by length of "Plong"
        has_sound = true;
    }

    if (!has_sound) {
        sprintf(result, "%d", drops);
    } else {
        *current_pos = '\0'; // Null-terminate the string if sounds were added
    }

    return result;
}