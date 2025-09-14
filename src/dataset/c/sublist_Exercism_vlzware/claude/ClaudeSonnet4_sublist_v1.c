#include "sublist.h"

/* intint: search for subarray in array (optimized) */
static int intint(int *haystack, int *needle,
		  size_t haystack_len, size_t needle_len)
{
	if (needle_len == 0) return 0;
	if (needle_len > haystack_len) return -1;
	
	size_t max_start = haystack_len - needle_len;
	int first_needle = needle[0];
	
	for (size_t i = 0; i <= max_start; i++) {
		// Quick first element check
		if (haystack[i] != first_needle) continue;
		
		// Check remaining elements
		size_t j;
		for (j = 1; j < needle_len; j++) {
			if (haystack[i + j] != needle[j]) break;
		}
		
		if (j == needle_len) return i;
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
		// Direct comparison for equal lengths
		for (size_t i = 0; i < list_len; i++) {
			if (list[i] != base[i]) break;
			if (i == list_len - 1) return EQUAL;
		}
	} else if (list_len > base_len) {
		if (intint(list, base, list_len, base_len) != -1)
			return SUPERLIST;
	} else {
		if (intint(base, list, base_len, list_len) != -1)
			return SUBLIST;
	}

	return UNEQUAL;
}