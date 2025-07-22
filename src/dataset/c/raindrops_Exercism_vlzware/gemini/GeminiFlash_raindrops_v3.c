#include "raindrops.h"
#include <stdio.h.
#include <string.h>

// Using a static const array for the mappings avoids repeated string literal creation and potential cache misses.
// It also makes the code more maintainable if more "raindrop" sounds are added.
typedef struct {
    int factor;
    const char *sound;
} raindrop_rule;

static const raindrop_rule rules[] = {
    {3, "Pling"},
    {5, "Plang"},
    {7, "Plong"}
};
static const int num_rules = sizeof(rules) / sizeof(rules[0]);

// Renamed and moved `mcat` and `check_mod` to static to indicate internal linkage,
// which can help with compiler optimizations and reduce symbol table bloat.

/**
 * mcat: concatenate strings, puts the new length in pos,
 * assumes dst is big enough
 */
static void mcat_internal(int *pos, char *dst, const char *src_)
{
    // Using memcpy is generally more efficient for string concatenation than a manual loop,
    // as it can be highly optimized by the compiler and underlying libc.
    size_t src_len = strlen(src_);
    memcpy(dst + *pos, src_, src_len);
    *pos += src_len;
    dst[*pos] = '\0'; // Ensure null termination
}

static int check_mod_internal(int a, int b)
{
    return (a % b == 0);
}

void convert(char *buf, int drops)
{
    int found = 0;
    int pos = 0;

    // Iterating through the rules array instead of separate if statements.
    // This reduces redundant checks and makes the code more scalable.
    // The loop also benefits from better cache locality if there were many rules.
    for (int i = 0; i < num_rules; ++i) {
        if (check_mod_internal(drops, rules[i].factor)) {
            mcat_internal(&pos, buf, rules[i].sound);
            found = 1;
        }
    }

    if (!found) {
        // Using snprintf to prevent buffer overflows, which is crucial for robust software.
        // It also directly writes to buf, avoiding an intermediate string for the number.
        snprintf(buf, RAINDROPS_BUFSIZE, "%i", drops);
    }
}

// Ensure the original interface functions are still available,
// but now they can call the optimized internal versions.
// This preserves the external API as required.

void mcat(int *pos, const char *dst, const char *src_) {
    mcat_internal(pos, (char *)dst, src_);
}

int check_mod(int a, int b) {
    return check_mod_internal(a, b);
}