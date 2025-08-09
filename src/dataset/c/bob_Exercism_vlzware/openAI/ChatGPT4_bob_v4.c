#include "bob.h"
#include <ctype.h>

#define SURE    "Sure."
#define WHOA    "Whoa, chill out!"
#define FINE    "Fine. Be that way!"
#define WTEVER  "Whatever."

char *hey_bob(const char *sentence)
{
    if (!sentence)
        return (char*) FINE;

    int alphas = 0, uppers = 0;
    char lastch = 0;
    const char *p = sentence;

    while (*p) {
        if (!isspace((unsigned char)*p)) {
            lastch = *p;
            if (isalpha((unsigned char)*p)) {
                alphas++;
                if (isupper((unsigned char)*p))
                    uppers++;
            }
        }
        p++;
    }

    if (!lastch)
        return (char*) FINE;
    if (alphas && alphas == uppers)
        return (char*) WHOA;
    if (lastch == '?')
        return (char*) SURE;

    return (char*) WTEVER;
}