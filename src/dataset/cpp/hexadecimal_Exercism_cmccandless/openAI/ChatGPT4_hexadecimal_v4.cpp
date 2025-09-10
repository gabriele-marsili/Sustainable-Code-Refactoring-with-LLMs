#include "hexadecimal.h"
#include <cctype>

int hexadecimal::convert(const std::string& s)
{
    int result = 0;
    for (char ch : s)
    {
        if (std::isdigit(ch))
            result = (result << 4) + (ch - '0');
        else if (std::isalpha(ch) && ch >= 'a' && ch <= 'f')
            result = (result << 4) + (ch - 'a' + 10);
        else
            return 0;
    }
    return result;
}