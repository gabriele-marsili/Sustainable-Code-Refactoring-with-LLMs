#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return strdup(""); // Return empty string for NULL or empty input
    }

    size_t phrase_len = strlen(phrase);
    size_t abbr_len = 1; // Start with 1 for the first character
    for (size_t i = 0; i < phrase_len - 1; i++) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            abbr_len++;
        }
    }

    char *abbr = malloc(abbr_len + 1); // Allocate memory for the acronym + null terminator
    if (abbr == NULL) {
        return NULL; // Handle memory allocation failure
    }

    size_t j = 0;
    abbr[j++] = toupper(phrase[0]); // Add the first character

    for (size_t i = 1; i < phrase_len; i++) {
        if (phrase[i - 1] == ' ' || phrase[i - 1] == '-') {
            abbr[j++] = toupper(phrase[i]);
        }
    }

    abbr[j] = '\0'; // Null-terminate the acronym

    return abbr;
}