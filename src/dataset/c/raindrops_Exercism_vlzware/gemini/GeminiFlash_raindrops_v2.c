#include "raindrops.h"
#include <stdio.h>
#include <string.h>
// Using a static buffer for "Pling", "Plang", "Plong" and the resulting string
// can reduce memory allocation overhead, but it might not be suitable
// if this function is called concurrently from multiple threads.
// For this problem, let's assume it's not a concern.
// The maximum length of the output string is 10 for "PlingPlangPlong" + null terminator,
// or 11 for an integer (e.g., -2,147,483,648) + null terminator.
// A buffer of 16 is more than enough.
void convert(char *buf, int drops) {
    size_t len = 0;
    // Check modulo operations directly and append to buffer
    if (drops % 3 == 0) {
        strcpy(buf + len, "Pling");
        len += 5;
    }
    if (drops % 5 == 0) {
        strcpy(buf + len, "Plang");
        len += 5;
    }
    if (drops % 7 == 0) {
        strcpy(buf + len, "Plong");
        len += 5;
    }
    // If no matches, convert the number to a string
    if (len == 0) {
        sprintf(buf, "%d", drops);
    }
}
// The original mcat and check_mod functions are no longer needed,
// as their functionality has been inlined and optimized within convert.
// However, the problem statement requires preserving function signatures.
// So, we'll keep them as stubs or with their original (though now unused) logic.
// If they were truly unused and not part of a public API, they would be removed.
void mcat(int *pos, const char *dst, const char *src_) {
    // This function is no longer used in the optimized convert,
    // but its signature is preserved as per requirements.
    // Original functionality:
    char *src = (char*) src_;
    char *tmp = (char*) dst + *pos;
    while ((*tmp++ = *src++))
        (*pos)++;
    *tmp = '\0';
}
int check_mod(int a, int b) {
    // This function is no longer used in the optimized convert,
    // but its signature is preserved as per requirements.
    // Original functionality:
    return (a % b == 0);
}