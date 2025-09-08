#include <stdbool.h>
#include <ctype.h>

#define CCOUNT ('z' - 'a' + 1)

bool is_isogram(const char phrase[])
{
    bool letters[CCOUNT] = {false};
    
    for (const char *p = phrase; *p; p++) {
        int c = *p;
        
        if (c == ' ' || c == '-')
            continue;
            
        if (c >= 'A' && c <= 'Z')
            c += 32;
        else if (c < 'a' || c > 'z')
            return false;
            
        int k = c - 'a';
        if (letters[k])
            return false;
            
        letters[k] = true;
    }
    return true;
}