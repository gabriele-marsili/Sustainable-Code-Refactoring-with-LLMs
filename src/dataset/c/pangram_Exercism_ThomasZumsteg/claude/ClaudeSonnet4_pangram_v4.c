#include "pangram.h"
#include <ctype.h>
#include <string.h>
#define LETTERS 26

int letter(char c) {
    if((c < 'a' || 'z' < c) && (c < 'A' || 'Z' < c)) return -1;
    return tolower(c) - 'a';
}

int is_pangram(const char *words) {
    if( words == NULL ) return 0;
    
    unsigned int found_letters = 0;
    const unsigned int all_letters = (1U << LETTERS) - 1;
    
    for(const char *p = words; *p && found_letters != all_letters; p++) {
        int l = letter(*p);
        if(l >= 0) {
            found_letters |= (1U << l);
        }
    }
    
    return found_letters == all_letters;
}