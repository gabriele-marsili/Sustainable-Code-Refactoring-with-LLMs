#include "sublist.h"

static int intint(int *haystack, int *needle,
		  size_t haystack_len, size_t needle_len)
{
	if (needle_len == 0)
		return 0;
	if (needle_len > haystack_len)
		return -1;
	
	size_t max_start = haystack_len - needle_len;
	for (size_t i = 0; i <= max_start; i++) {
		if (haystack[i] == needle[0]) {
			size_t j = 1;
			while (j < needle_len && haystack[i + j] == needle[j])
				j++;
			if (j == needle_len)
				return i;
		}
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
		if (list_len == 0)
			return EQUAL;
		for (size_t i = 0; i < list_len; i++) {
			if (list[i] != base[i])
				return (intint(list, base, list_len, base_len) == 0) ? EQUAL : UNEQUAL;
		}
		return EQUAL;
	}

	if (list_len > base_len)
		return (intint(list, base, list_len, base_len) != -1) ? SUPERLIST : UNEQUAL;

	return (intint(base, list, base_len, list_len) != -1) ? SUBLIST : UNEQUAL;
}