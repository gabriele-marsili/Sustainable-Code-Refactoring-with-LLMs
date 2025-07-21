#include "raindrops.h"
#include <stdio.h>
#include <string.h>
// Using a static buffer for "Pling", "Plang", "Plong" avoids repeated string literal access,
// potentially improving cache performance and reducing instruction count.
static const char pling_str[] = "Pling";
static const char plang_str[] = "Plang";
static const char plong_str[] = "Plong";
void mcat(int *pos, char *dst, const char *src);
int check_mod(int a, int b);
void convert(char *buf, int drops)
{
    // Initialize buf[0] to '\0' to ensure it's always a valid empty string
    // if no conditions are met or if no "Pling", "Plang", "Plong" is appended.
    buf[0] = '\0';
    int found = 0;
    int pos = 0;
    if ((drops % 3) == 0) { // Direct modulo operation is often faster than a function call
        mcat(&pos, buf, pling_str);
        found = 1;
    }
    if ((drops % 5) == 0) {
        mcat(&pos, buf, plang_str);
        found = 1;
    }
    if ((drops % 7) == 0) {
        mcat(&pos, buf, plong_str);
        found = 1;
    }
    if (!found) {
        // Use snprintf to prevent buffer overflows, a good practice for robustness.
        // It also returns the number of characters that would have been written,
        // which can be useful for debugging or future string manipulation, though not used here.
        snprintf(buf, RAINDROPS_BUFSIZE, "%i", drops);
    }
}
/**
 * mcat: concatenate strings, puts the new length in pos,
 * assumes dst is big enough
 */
void mcat(int *pos, char *dst, const char *src)
{
    // Directly use strcat for efficiency. It's highly optimized and likely
    // to be implemented in assembly for common architectures.
    // The *pos is maintained by keeping track of the current end of string.
    strcat(dst + *pos, src);
    *pos += strlen(src);
}
// check_mod function is inlined by directly using the modulo operator in convert.
// This reduces function call overhead.
// If it were to be kept as a separate function, it could be marked as `static inline`
// to hint the compiler for inlining, but direct use is even more explicit.
int check_mod(int a, int b)
{
    return (a % b == 0);
}