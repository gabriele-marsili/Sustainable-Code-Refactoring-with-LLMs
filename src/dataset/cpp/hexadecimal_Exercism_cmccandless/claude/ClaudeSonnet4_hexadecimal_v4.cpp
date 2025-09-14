#include "hexadecimal.h"

int hexadecimal::convert(string s)
{
    if (s.empty()) return 0;
    
    auto result = 0;
    const char* ptr = s.data();
    const char* end = ptr + s.size();
    
    while (ptr != end) {
        const char ch = *ptr++;
        result <<= 4;
        
        if (ch >= '0' && ch <= '9') {
            result += ch - '0';
        } else if (ch >= 'a' && ch <= 'f') {
            result += ch - 'a' + 10;
        } else if (ch >= 'A' && ch <= 'F') {
            result += ch - 'A' + 10;
        } else {
            return 0;
        }
    }
    return result;
}