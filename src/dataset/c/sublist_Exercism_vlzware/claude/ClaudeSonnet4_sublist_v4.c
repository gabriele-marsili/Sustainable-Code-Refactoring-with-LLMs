#include "sublist.h"

static int intint(int *haystack, int *needle,
		  size_t haystack_len, size_t needle_len)
{
	if (needle_len == 0)
		return 0;
	if (needle_len > haystack_len)
		return -1;
	
	const size_t search_limit = haystack_len - needle_len + 1;
	const int first_needle = needle[0];
	
	for (size_t i = 0; i < search_limit; i++) {
		if (haystack[i] == first_needle) {
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
		if (list_len == 0 || intint(list, base, list_len, base_len) == 0)
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