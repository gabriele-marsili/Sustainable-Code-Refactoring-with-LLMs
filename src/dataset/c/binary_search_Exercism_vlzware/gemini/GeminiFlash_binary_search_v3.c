#include "binary_search.h"
#include <stddef.h>

int* binary_search(const int x, const int arr[], const int len)
{
	if (arr == NULL || len <= 0)
		return NULL;

	int low = 0;
	int high = len - 1;

	while (low <= high) {
		// Use bitwise shift for calculating the middle index to avoid potential overflow
		int mid = low + ((high - low) >> 1);

		if (arr[mid] == x) {
			return (int*)&arr[mid];
		} else if (arr[mid] < x) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return NULL;
}