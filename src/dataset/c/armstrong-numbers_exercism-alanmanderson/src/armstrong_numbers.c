#include "armstrong_numbers.h"
#include <stdio.h>

bool is_armstrong_number(int candidate) {
//    printf("Candidate: %d \n", candidate);
    int length = 0;
	int orig_candidate = candidate;
	do {
        candidate /= 10;
		length++;
	} while (candidate != 0);
//    printf("Length: %d", length);

    int armstrong = 0, r;
	candidate = orig_candidate;
	while (candidate != 0) {
        r = candidate % 10;
//		printf("r: %d\n", r);
		int cur = length - 1;
		int num = r;
		while (cur != 0){
            num *= r;
			--cur;
		}
//		printf("r^%d: %d\n", length, num);
		armstrong += num;
//		printf("Armstrong: %d\n", armstrong);
		candidate /= 10;
	}

	return armstrong == orig_candidate;
}
