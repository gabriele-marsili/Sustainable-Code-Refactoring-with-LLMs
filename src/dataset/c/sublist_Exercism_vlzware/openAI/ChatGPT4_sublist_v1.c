#include "sublist.h"
#include <stdbool.h>

/* Helper function to check if needle is a subarray of haystack */
static bool is_subarray(int *haystack, int *needle, size_t haystack_len, size_t needle_len) {
	if (needle_len == 0) return true; // Empty needle is always a subarray
	if (haystack_len < needle_len) return false;

	for (size_t i = 0; i <= haystack_len - needle_len; i++) {
		bool match = true;
		for (size_t j = 0; j < needle_len; j++) {
			if (haystack[i + j] != needle[j]) {
				match = false;
				break;
			}
		}
		if (match) return true;
	}
	return false;
}

comparison_result_t check_lists(int *list, int *base,
				size_t list_len, size_t base_len)
{
	if (list == NULL)
		return (base == NULL) ? EQUAL : SUBLIST;
	if (base == NULL)
		return SUPERLIST;

	if (list_len == base_len && is_subarray(list, base, list_len, base_len))
		return EQUAL;

	if (list_len > base_len && is_subarray(list, base, list_len, base_len))
		return SUPERLIST;

	if (list_len < base_len && is_subarray(base, list, base_len, list_len))
		return SUBLIST;

	return UNEQUAL;
}