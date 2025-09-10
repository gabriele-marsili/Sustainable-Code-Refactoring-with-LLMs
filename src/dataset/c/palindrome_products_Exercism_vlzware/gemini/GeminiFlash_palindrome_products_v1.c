#include "palindrome_products.h"
#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

static bool is_palindrome(int n);
static int add_factor(factor_t ** p, int i, int k);
static void free_linked_list(factor_t *head);

product_t *get_palindrome_product(int from, int to)
{
	product_t *result = malloc(sizeof(product_t));
	if (result == NULL) {
		fprintf(stderr, "Memory allocation error!\n");
		return NULL;
	}

	result->error[MAXERR - 1] = '\0';
	result->smallest = INT_MAX;
	result->largest = INT_MIN;
	result->factors_lg = NULL;
	result->factors_sm = NULL;

	if (from > to) {
		snprintf(result->error, MAXERR - 1,
			 "Invalid input: min is %i and max is %i", from, to);
		return result;
	}

	int product;
	bool smallest_found = false;
	bool largest_found = false;

	for (int i = from; i <= to; ++i) {
		for (int k = i; k <= to; ++k) {
			product = i * k;
			if (is_palindrome(product)) {
				if (product <= result->smallest) {
					if (product < result->smallest) {
						free_linked_list(result->factors_sm);
						result->factors_sm = NULL;
						result->smallest = product;
					}
					if (add_factor(&result->factors_sm, i, k) != 0) {
						free_product(result);
						return NULL;
					}
					smallest_found = true;
				}

				if (product >= result->largest) {
					if (product > result->largest) {
						free_linked_list(result->factors_lg);
						result->factors_lg = NULL;
						result->largest = product;
					}
					if (add_factor(&result->factors_lg, i, k) != 0) {
						free_product(result);
						return NULL;
					}
					largest_found = true;
				}
			}
		}
	}

	if (!smallest_found || !largest_found) {
		snprintf(result->error, MAXERR - 1,
			 "No palindrome with factors in the range %i to %i",
			 from, to);
	}

	return result;
}

void free_product(product_t * p)
{
	if (p == NULL) {
		return;
	}
	free_linked_list(p->factors_lg);
	free_linked_list(p->factors_sm);
	free(p);
}

static void free_linked_list(factor_t *head)
{
	while (head != NULL) {
		factor_t *tmp = head;
		head = head->next;
		free(tmp);
	}
}

static int add_factor(factor_t ** p, int i, int k)
{
	factor_t *new_factor = malloc(sizeof(factor_t));
	if (new_factor == NULL) {
		fprintf(stderr, "Memory allocation error!\n");
		return 1;
	}

	new_factor->factor_a = i;
	new_factor->factor_b = k;
	new_factor->next = *p;
	*p = new_factor;

	return 0;
}

static bool is_palindrome(int n)
{
	if (n < 0) {
		return false;
	}

	if (n < 10) {
		return true;
	}

	int reversed_n = 0;
	int original_n = n;

	while (n > 0) {
		int remainder = n % 10;
		reversed_n = reversed_n * 10 + remainder;
		n /= 10;
	}

	return original_n == reversed_n;
}