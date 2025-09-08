#include "isogram.h"
#include <string.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;
    
    size_t alphabet_array[ALPHABET_SIZE];
    memset(alphabet_array, 0, sizeof(alphabet_array));
    
    for (const char *p = phrase; *p != '\0'; p++) {
        char chr = *p;
        size_t index;
        
        if (chr >= 'a' && chr <= 'z') {
            index = chr - 'a';
        } else if (chr >= 'A' && chr <= 'Z') {
            index = chr - 'A';
        } else {
            continue;
        }
        
        if (alphabet_array[index]) return false;
        alphabet_array[index] = 1;
    }
    
    return true;
}

void clear_array(size_t *input_array, size_t length) {
    memset(input_array, 0, length * sizeof(size_t));
}