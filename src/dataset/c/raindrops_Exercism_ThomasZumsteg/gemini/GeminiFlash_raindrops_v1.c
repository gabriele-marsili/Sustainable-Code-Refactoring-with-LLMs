#include "raindrops.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char *convert(char* sound, size_t len, int num) {
    // Using a pointer to fill the buffer directly can be more efficient than strncat
    // as it avoids repeated strlen calls and potential re-scans of the string.
    char *current_pos = sound;
    size_t remaining_len = len;
    int appended = 0;
    // Check for "Pling"
    if (num % 3 == 0) {
        // Ensure we don't write beyond the buffer's capacity.
        // The -1 is for the null terminator.
        size_t to_copy = strlen("Pling");
        if (to_copy >= remaining_len) { // Check if there's enough space for "Pling" + null terminator
            to_copy = remaining_len - 1; // Copy only what fits, leaving space for null terminator
        }
        memcpy(current_pos, "Pling", to_copy);
        current_pos += to_copy;
        remaining_len -= to_copy;
        appended = 1;
    }
    // Check for "Plang"
    if (num % 5 == 0) {
        size_t to_copy = strlen("Plang");
        if (to_copy >= remaining_len) {
            to_copy = remaining_len - 1;
        }
        memcpy(current_pos, "Plang", to_copy);
        current_pos += to_copy;
        remaining_len -= to_copy;
        appended = 1;
    }
    // Check for "Plong"
    if (num % 7 == 0) {
        size_t to_copy = strlen("Plong");
        if (to_copy >= remaining_len) {
            to_copy = remaining_len - 1;
        }
        memcpy(current_pos, "Plong", to_copy);
        current_pos += to_copy;
        remaining_len -= to_copy;
        appended = 1;
    }
    // If no "Pling", "Plang", or "Plong" was appended, convert the number to a string.
    if (!appended) {
        // snprintf is generally efficient for number to string conversion.
        // It also handles buffer overflow gracefully by not writing past len - 1.
        snprintf(sound, len, "%d", num);
    } else {
        // Null-terminate the string if something was appended.
        // This handles the case where remaining_len might be 0, preventing writing out of bounds.
        if (remaining_len > 0) {
            *current_pos = '\0';
        } else if (len > 0) {
            // If remaining_len is 0, it means the buffer is full. Ensure the last char is null terminator.
            sound[len - 1] = '\0';
        }
    }
    return sound;
}