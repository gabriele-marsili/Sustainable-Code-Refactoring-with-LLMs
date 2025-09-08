#include <stdbool.h>
#include <string.h>
#include <ctype.h>

#define CCOUNT ('z' - 'a' + 1)

bool is_isogram(const char phrase[])
{
    if (!phrase) return true;

    bool letters[CCOUNT] = {false};
    const char *p = phrase;
    int k;
    char c;

    while (*p) {
        c = tolower(*p);

        if (c == ' ' || c == '-') {
            p++;
            continue;
        }

        if (!isalpha(c)) {
            return false;
        }

        k = c - 'a';
        if (letters[k]) {
            return false;
        }

        letters[k] = true;
        p++;
    }

    return true;
}