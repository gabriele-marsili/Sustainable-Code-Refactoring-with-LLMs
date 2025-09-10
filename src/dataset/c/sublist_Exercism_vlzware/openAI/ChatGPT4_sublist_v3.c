#include "sublist.h"

/* intint: search for subarray in array (optimized) */
static int intint(int *haystack, int *needle,
                  size_t haystack_len, size_t needle_len)
{
    if (needle_len == 0)
        return 0;
    if (haystack_len < needle_len)
        return -1;

    size_t i, j;
    for (i = 0; i <= haystack_len - needle_len; i++) {
        for (j = 0; j < needle_len; j++) {
            if (haystack[i + j] != needle[j])
                break;
        }
        if (j == needle_len)
            return i;
    }
    return -1;
}

comparison_result_t check_lists(int *list, int *base,
                                size_t list_len, size_t base_len)
{
    if (list == NULL)
        return (base == NULL) ? EQUAL : SUBLIST;
    if (base == NULL)
        return SUPERLIST;

    if (list_len == base_len) {
        if (intint(list, base, list_len, base_len) == 0)
            return EQUAL;
    } else if (list_len > base_len) {
        if (intint(list, base, list_len, base_len) != -1)
            return SUPERLIST;
    } else {
        if (intint(base, list, base_len, list_len) != -1)
            return SUBLIST;
    }

    return UNEQUAL;
}