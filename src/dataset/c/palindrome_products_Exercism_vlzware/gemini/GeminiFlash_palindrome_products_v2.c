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

	int i, k, product;
	int err = 0;
	bool smallest_found = false;
	bool largest_found = false;

	for (i = from; i <= to; i++) {
		for (k = i; k <= to; k++) {
			product = i * k;
			if (is_palindrome(product)) {
				if (product <= res->smallest) {
					if (product < res->smallest || !smallest_found) {
						free_linked_list(res->factors_sm);
						res->factors_sm = NULL;
						res->smallest = product;
						smallest_found = true;
					}
					err = add_factor(&res->factors_sm, i, k);
					if (err) {
						free(res);
						return NULL;
					}
				}

				if (product >= res->largest) {
					if (product > res->largest || !largest_found) {
						free_linked_list(res->factors_lg);
						res->factors_lg = NULL;
						res->largest = product;
						largest_found = true;
					}
					err = add_factor(&res->factors_lg, i, k);
					if (err) {
						free(res);
						return NULL;
					}
				}
			}
		}
	}

	if (!smallest_found || !largest_found) {
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
		factor_t *next = p->next;
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

	tmp->next = *p;
	tmp->factor_a = i;
	tmp->factor_b = k;
	*p = tmp;
	return 0;
}

static bool is_palindrome(int n)
{
	if (n < 0)
		n = -n;

	if (n < 10)
		return true;

	int reversed_n = 0;
	int original_n = n;

	while (n > 0) {
		int digit = n % 10;
		reversed_n = reversed_n * 10 + digit;
		n /= 10;
	}

	return original_n == reversed_n;
}