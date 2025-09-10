#include "palindrome_products.h"
#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

static bool is_palindrome(int n);
static int add_factor(factor_t ** p, int i, int k);
static void free_linked_list(struct factors *p);

product_t *get_palindrome_product(int from, int to)
{
	product_t *res = malloc(sizeof(product_t));
	if (res == NULL) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	res->error[MAXERR - 1] = '\0';
	res->smallest = INT_MAX;
	res->largest = INT_MIN;
	res->factors_lg = NULL;
	res->factors_sm = NULL;

	if (from > to) {
		snprintf(res->error, MAXERR - 1,
			 "invalid input: min is %i and max is %i", from, to);
		return res;
	}

	int err = 0;
	for (long i = (long)from; i <= (long)to; i++) {
		for (long k = i; k <= (long)to; k++) {
			long product = i * k;
			if (product > INT_MAX || product < INT_MIN) continue;

			int n = (int)product;

			if (is_palindrome(n)) {
				if (n <= res->smallest) {
					if (n < res->smallest) {
						free_linked_list(res->factors_sm);
						res->factors_sm = NULL;
						res->smallest = n;
					}
					err = add_factor(&res->factors_sm, (int)i, (int)k);
				}

				if (n >= res->largest) {
					if (n > res->largest) {
						free_linked_list(res->factors_lg);
						res->factors_lg = NULL;
						res->largest = n;
					}
					err = add_factor(&res->factors_lg, (int)i, (int)k);
				}

				if (err) {
					free_product(res);
					return NULL;
				}
			}
		}
	}

	if ((res->smallest == INT_MAX) || (res->largest == INT_MIN)) {
		snprintf(res->error, MAXERR - 1,
			 "no palindrome with factors in the range %i to %i",
			 from, to);
		return res;
	}
	return res;
}

void free_product(product_t * p)
{
	if (p == NULL)
		return;
	free_linked_list(p->factors_lg);
	free_linked_list(p->factors_sm);
	free(p);
}

static void free_linked_list(struct factors *p)
{
	while (p != NULL) {
		struct factors *next = p->next;
		free(p);
		p = next;
	}
}

static int add_factor(factor_t ** p, int i, int k)
{
	factor_t *tmp = malloc(sizeof(factor_t));
	if (tmp == NULL) {
		fprintf(stderr, "Memory error!\n");
		return 1;
	}

	tmp->factor_a = i;
	tmp->factor_b = k;
	tmp->next = *p;
	*p = tmp;

	return 0;
}

static bool is_palindrome(int n)
{
	if (n < 0)
		return false;

	if (n < 10)
		return true;

	int reversed_n = 0;
	int original_n = n;

	while (n > 0) {
		int remainder = n % 10;
		reversed_n = reversed_n * 10 + remainder;
		n /= 10;
	}

	return original_n == reversed_n;
}