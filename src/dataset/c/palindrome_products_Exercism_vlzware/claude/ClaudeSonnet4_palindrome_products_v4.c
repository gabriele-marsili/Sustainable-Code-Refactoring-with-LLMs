#include "palindrome_products.h"
#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

static int palindrome(int n);
static int addfactors(factor_t ** p, int i, int k);
static void free_ll(struct factors *p);

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

	int i, k, n;
	int err = 0;
	int found_palindrome = 0;
	
	for (i = from; i <= to && !err; i++) {
		for (k = i; k <= to && !err; k++) {
			n = i * k;
			if (palindrome(n)) {
				found_palindrome = 1;
				if (n < res->smallest) {
					res->smallest = n;
					err = addfactors(&res->factors_sm, i, k);
				} else if (n == res->smallest) {
					err = addfactors(&res->factors_sm, i, k);
				} else if (n > res->largest) {
					res->largest = n;
					err = addfactors(&res->factors_lg, i, k);
				} else if (n == res->largest) {
					err = addfactors(&res->factors_lg, i, k);
				}
			}
		}
	}

	if (err) {
		free_product(res);
		return NULL;
	}

	if (!found_palindrome) {
		snprintf(res->error, MAXERR - 1,
			 "no palindrome with factors in the range %i to %i",
			 from, to);
	}
	
	return res;
}

void free_product(product_t * p)
{
	if (p == NULL)
		return;
	free_ll(p->factors_lg);
	free_ll(p->factors_sm);
	free(p);
}

static void free_ll(struct factors *p)
{
	struct factors *current = p;
	struct factors *next;
	
	while (current != NULL) {
		next = current->next;
		free(current);
		current = next;
	}
}

static int addfactors(factor_t ** p, int i, int k)
{
	int n = i * k;
	if ((*p == NULL) || (((*p)->factor_a) * (*p)->factor_b != n)) {
		free_ll(*p);
		*p = NULL;
	}

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

static int palindrome(int n)
{
	if (n < 0)
		n = -n;
	
	int original = n;
	int reversed = 0;

	while (n > 0) {
		reversed = reversed * 10 + n % 10;
		n /= 10;
	}

	return (original == reversed);
}