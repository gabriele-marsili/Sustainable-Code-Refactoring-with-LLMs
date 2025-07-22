#include "raindrops.h"
#include <string.h>
#include <stdio.h>

void convert(char result[], int drops)
{
    // Using a local buffer for building the string to avoid multiple sprintf calls if possible,
    // and then copying to the result, potentially reducing overall memory operations
    // and improving cache locality.
    char temp_buffer[32]; // Sufficiently large for "PlingPlangPlong" + null terminator or an integer.
    temp_buffer[0] = '\0'; // Initialize to an empty string.

    // Using a boolean flag to track if any "Pling", "Plang", or "Plong" has been appended.
    // This avoids the need for the final `else if (drops %3 != 0 && drops %5 != 0 && drops % 7!=0)` check
    // and directly handles the integer conversion if no conditions are met.
    int appended = 0;

    if (drops % 3 == 0) {
        strcat(temp_buffer, "Pling");
        appended = 1;
    }
    if (drops % 5 == 0) {
        strcat(temp_buffer, "Plang");
        appended = 1;
    }
    if (drops % 7 == 0) {
        strcat(temp_buffer, "Plong");
        appended = 1;
    }

    if (appended) {
        strcpy(result, temp_buffer);
    } else {
        sprintf(result, "%d", drops);
    }
}