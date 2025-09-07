#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL) return NULL;
    
    size_t capacity = 8;
    char *result = malloc(capacity);
    if (result == NULL) return NULL;
    
    size_t count = 0;
    bool take_next = true;
    
    for (const char *p = phrase; *p; p++) {
        if (*p == ' ' || *p == '-') {
            take_next = true;
        } else if (take_next && isalpha(*p)) {
            if (count >= capacity - 1) {
                capacity *= 2;
                char *new_result = realloc(result, capacity);
                if (new_result == NULL) {
                    free(result);
                    return NULL;
                }
                result = new_result;
            }
            result[count++] = toupper(*p);
            take_next = false;
        }
    }
    
    if (count == 0) {
        free(result);
        return NULL;
    }
    
    result[count] = '\0';
    return result;
}