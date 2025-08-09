#include "pangram.h"
#include <ctype.h>
#include <string.h>
#define LETTERS 26

int is_pangram(const char *words) {
    if( words == NULL ) return 0;
    
    unsigned int found_letters = 0;
    const unsigned int all_letters = (1U << LETTERS) - 1;
    
    for(const char *p = words; *p && found_letters != all_letters; p++) {
        char c = *p;
        if((c >= 'a' && c <= 'z')) {
            found_letters |= (1U << (c - 'a'));
        } else if((c >= 'A' && c <= 'Z')) {
            found_letters |= (1U << (c - 'A'));
        }
    }
    
    return found_letters == all_letters;
}