#include "raindrops.h"

void convert(char result[], int drops) {
    int pos = 0;
    if (drops % 3 == 0) {
        const char *p = "Pling";
        while (*p) result[pos++] = *p++;
    }
    if (drops % 5 == 0) {
        const char *p = "Plang";
        while (*p) result[pos++] = *p++;
    }
    if (drops % 7 == 0) {
        const char *p = "Plong";
        while (*p) result[pos++] = *p++;
    }
    if (pos == 0) {
        // Convert integer to string manually to avoid overhead of sprintf/strcpy/strcat
        int n = drops;
        char buf[12]; // enough for 32-bit int + sign + null
        int i = 0;
        if (n == 0) {
            result[pos++] = '0';
        } else {
            if (n < 0) {
                result[pos++] = '-';
                n = -n;
            }
            // Convert to string in reverse order
            while (n > 0) {
                buf[i++] = '0' + (n % 10);
                n /= 10;
            }
            // Reverse buf into result
            for (int j = i - 1; j >= 0; j--) {
                result[pos++] = buf[j];
            }
        }
    }
    result[pos] = '\0';
}
