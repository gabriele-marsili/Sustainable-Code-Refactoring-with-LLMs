#include "sublist.h"
#include <string.h>

static int intint(int *haystack, int *needle,
		  size_t haystack_len, size_t needle_len)
{
	if (needle_len == 0) return 0;
	if (haystack_len == 0) return -1;
	if (needle_len > haystack_len) return -1;

	for (size_t i = 0; i <= haystack_len - needle_len; ++i) {
		if (memcmp(haystack + i, needle, needle_len * sizeof(int)) == 0) {
			return i;
		}
	}
	return -1;
}

comparison_result_t check_lists(int *list, int *base,
				size_t list_len, size_t base_len)
{
	if (list == NULL)
		return (base == NULL)
		    ? EQUAL : SUBLIST;
	if (base == NULL)
		return SUPERLIST;

	if (list_len == base_len) {
		if (list_len == 0) return EQUAL;
		if (memcmp(list, base, list_len * sizeof(int)) == 0)
			return EQUAL;
		else
			return UNEQUAL;
	}

	else if (list_len > base_len) {
		if (base_len == 0) return SUPERLIST;
		if (intint(list, base, list_len, base_len) != -1)
			return SUPERLIST;
		else
			return UNEQUAL;
	}

	else {
		if (list_len == 0) return SUBLIST;
		if (intint(base, list, base_len, list_len) != -1)
			return SUBLIST;
		else
			return UNEQUAL;
	}
}