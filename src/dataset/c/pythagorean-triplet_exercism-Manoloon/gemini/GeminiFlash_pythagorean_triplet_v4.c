#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>
#include <math.h>

static inline int gcd(int a, int b) {
    while (b) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

triplets_t *triplets_with_sum(int sum) {
    if (sum < 12) return NULL;

    triplets_t *result = malloc(sizeof(triplets_t));
    if (!result) return NULL;

    size_t capacity = 16;
    triplet_t *triplets = malloc(sizeof(triplet_t) * capacity);
    if (!triplets) {
        free(result);
        return NULL;
    }

    size_t count = 0;
    int sum_div_2 = sum / 2;
    int sum_div_4 = sum / 4;

    for (int m = 2; m <= sqrt(sum_div_2); ++m) {
        for (int n = 1; n < m; ++n) {
            if (((m - n) % 2 == 0) || (gcd(m, n) != 1)) continue;

            int a = m * m - n * n;
            int b = 2 * m * n;
            int c = m * m + n * n;

            if (a + b + c > sum) continue;

            if (sum % (a + b + c) == 0) {
                int k = sum / (a + b + c);

                if (count >= capacity) {
                    capacity *= 2;
                    triplet_t *temp_triplets = realloc(triplets, sizeof(triplet_t) * capacity);
                    if (!temp_triplets) {
                        fprintf(stderr, "ERROR: Out of memory for realloc triplets, capacity attempt: %zu\n", capacity);
                        free(triplets);
                        free(result);
                        return NULL;
                    }
                    triplets = temp_triplets;
                }

                int ka = a * k;
                int kb = b * k;
                int kc = c * k;

                if (ka > kb) {
                    int temp = ka;
                    ka = kb;
                    kb = temp;
                }

                triplets[count].a = ka;
                triplets[count].b = kb;
                triplets[count].c = kc;
                count++;
            }
        }
    }

    result->count = count;
    result->triplets = triplets;
    return result;
}

void free_triplets(triplets_t *triplets) {
    if (triplets) {
        free(triplets->triplets);
        free(triplets);
    }
}