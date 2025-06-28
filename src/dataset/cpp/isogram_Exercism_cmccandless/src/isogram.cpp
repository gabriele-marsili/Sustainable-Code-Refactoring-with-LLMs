#include <map>

#include "isogram.h"

namespace isogram
{
bool is_isogram(const std::string phrase)
{
    for (int i = 0; i < (int)phrase.length(); i++)
    {
        char ch = phrase[i];
        if (isalpha(ch))
        {
            auto pos = phrase.rfind(tolower(ch));
            if (pos != std::string::npos && (int)pos != i)
                return false;

            pos = phrase.rfind(toupper(ch));
            if (pos != std::string::npos && (int)pos != i)
                return false;
        }
    }
    return true;
}
} // namespace isogram