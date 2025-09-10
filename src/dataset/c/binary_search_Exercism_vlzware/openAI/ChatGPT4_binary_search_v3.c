#include "binary_search.h"
#include <stddef.h>

int* binary_search(const int x, const int arr[], const int len)
{
	if (!arr || len <= 0)
		return NULL;

	int down = 0, up = len - 1;
	while (down <= up) {
		int mid = down + ((up - down) >> 1);
		if (x == arr[mid])
			return (int *)&arr[mid];
		if (x > arr[mid])
			down = mid + 1;
		else
			up = mid - 1;
	}

	return NULL;
}