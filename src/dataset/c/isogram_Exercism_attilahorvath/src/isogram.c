#include "isogram.h"
#include <ctype.h>

int isIsogram(const char *string) {
    int c1, c2;

    for (int i = 0; (c1 = string[i]) != '\0'; i++) {
        c1 = tolower(c1);

        if (c1 < 'a' || c1 > 'z') {
            continue;
        }

        for (int j = i + 1; (c2 = string[j]) != '\0'; j++) {
            c2 = tolower(c2);

            if (c1 == c2) {
                return 0;
            }
        }
    }

    return 1;
}
