#include "raindrops.h"
#include <stdio.h>
#include <string.h>
void mcat(int *pos, const char *dst, const char *src_);
int check_mod(int a, int b);
void convert(char *buf, int drops)
{
    int found = 0;
    int pos = 0;
    if (drops % 3 == 0) {
        mcat(&pos, buf, "Pling");
        found = 1;
    }
    if (drops % 5 == 0) {
        mcat(&pos, buf, "Plang");
        found = 1;
    }
    if (drops % 7 == 0) {
        mcat(&pos, buf, "Plong");
        found = 1;
    }
    if (!found) {
        sprintf(buf, "%i", drops);
    }
}
void mcat(int *pos, const char *dst, const char *src_)
{
    char *dest_ptr = (char*) dst + *pos;
    size_t len = strlen(src_);
    memcpy(dest_ptr, src_, len);
    *pos += len;
    *(dest_ptr + len) = '\0';
}
int check_mod(int a, int b)
{
    return (a % b == 0);
}