#include "palindrome_products.h"
#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

static int is_palindrome(int n);
static int add_factors(factor_t **p, int i, int k);
static void free_factors_list(struct factors *p);

product_t *get_palindrome_product(int from, int to)
{
    if (from > to) {
        product_t *res = malloc(sizeof(product_t));
        if (!res) {
            fprintf(stderr, "Memory error!\n");
            return NULL;
        }
        snprintf(res->error, MAXERR - 1, "invalid input: min is %i and max is %i", from, to);
        res->error[MAXERR - 1] = '\0';
        res->smallest = INT_MAX;
        res->largest = INT_MIN;
        res->factors_lg = NULL;
        res->factors_sm = NULL;
        return res;
    }

    product_t *res = calloc(1, sizeof(product_t));
    if (!res) {
        fprintf(stderr, "Memory error!\n");
        return NULL;
    }

    res->smallest = INT_MAX;
    res->largest = INT_MIN;

    for (int i = from; i <= to; i++) {
        for (int k = i; k <= to; k++) {
            int n = i * k;
            if (is_palindrome(n)) {
                if (n < res->smallest) {
                    res->smallest = n;
                    free_factors_list(res->factors_sm);
                    res->factors_sm = NULL;
                    if (add_factors(&res->factors_sm, i, k)) {
                        free_product(res);
                        return NULL;
                    }
                } else if (n > res->largest) {
                    res->largest = n;
                    free_factors_list(res->factors_lg);
                    res->factors_lg = NULL;
                    if (add_factors(&res->factors_lg, i, k)) {
                        free_product(res);
                        return NULL;
                    }
                } else if (n == res->smallest) {
                    if (add_factors(&res->factors_sm, i, k)) {
                        free_product(res);
                        return NULL;
                    }
                } else if (n == res->largest) {
                    if (add_factors(&res->factors_lg, i, k)) {
                        free_product(res);
                        return NULL;
                    }
                }
            }
        }
    }

    if (res->smallest == INT_MAX || res->largest == INT_MIN) {
        snprintf(res->error, MAXERR - 1, "no palindrome with factors in the range %i to %i", from, to);
        res->error[MAXERR - 1] = '\0';
    }

    return res;
}

void free_product(product_t *p)
{
    if (!p) return;
    free_factors_list(p->factors_lg);
    free_factors_list(p->factors_sm);
    free(p);
}

static void free_factors_list(struct factors *p)
{
    while (p) {
        struct factors *next = p->next;
        free(p);
        p = next;
    }
}

static int add_factors(factor_t **p, int i, int k)
{
    factor_t *new_factor = malloc(sizeof(factor_t));
    if (!new_factor) {
        fprintf(stderr, "Memory error!\n");
        return 1;
    }

    new_factor->factor_a = i;
    new_factor->factor_b = k;
    new_factor->next = *p;
    *p = new_factor;

    return 0;
}

static int is_palindrome(int n)
{
    if (n < 0) n = -n;
    int reversed = 0, original = n;

    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n /= 10;
    }

    return original == reversed;
}