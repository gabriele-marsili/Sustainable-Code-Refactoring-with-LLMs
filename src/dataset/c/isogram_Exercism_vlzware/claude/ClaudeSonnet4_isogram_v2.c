#include <stdbool.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    unsigned int seen = 0;
    
    for (const char *p = phrase; *p; p++) {
        int c = *p;
        
        if (c == ' ' || c == '-')
            continue;
            
        if (c >= 'A' && c <= 'Z')
            c += 32;
        else if (c < 'a' || c > 'z')
            return false;
            
        int bit = 1 << (c - 'a');
        if (seen & bit)
            return false;
            
        seen |= bit;
    }
    return true;
}