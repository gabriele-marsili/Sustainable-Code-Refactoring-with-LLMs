#include <stdbool.h>
#include <string.h>
#include <ctype.h>

#define CCOUNT ('z' - 'a' + 1)

bool is_isogram(const char phrase[])
{
    if (phrase == NULL || *phrase == '\0') {
        return true;
    }

    bool letters[CCOUNT] = {false};
    const char *p = phrase;
    int c;

    while (*p) {
        c = tolower(*p);

        if (c == ' ' || c == '-') {
            p++;
            continue;
        }

        if (!isalpha(c)) {
            return false;
        }

        int k = c - 'a';
        if (letters[k]) {
            return false;
        }

        letters[k] = true;
        p++;
    }

    return true;
}