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
    if (result == NULL) return NULL;

    uint16_t capacity = 16;
    triplet_t *triplets = malloc(sizeof(triplet_t) * capacity);
    if (triplets == NULL) {
        free(result);
        return NULL;
    }

    uint16_t count = 0;
    int sum_div_2 = sum / 2;
    int sum_div_4 = sum / 4;

    for (int m = 2; m <= sqrt(sum_div_2); ++m) {
        for (int n = 1; n < m; ++n) {
            if (((m - n) % 2 == 0) || (gcd(m, n) != 1)) continue;

            int a = m * m - n * n;
            int b = 2 * m * n;
            int c = m * m + n * n;

            if (a + b + c == sum) {
                if (count >= capacity) {
                    capacity *= 2;
                    triplet_t *temp_triplets = realloc(triplets, sizeof(triplet_t) * capacity);
                    if (temp_triplets == NULL) {
                        fprintf(stderr, "ERROR: Out of memory reallocating triplets (capacity = %d)\n", capacity);
                        free(triplets);
                        free(result);
                        return NULL;
                    }
                    triplets = temp_triplets;
                }

                if (a > b) {
                    int temp = a;
                    a = b;
                    b = temp;
                }

                triplets[count].a = a;
                triplets[count].b = b;
                triplets[count].c = c;
                count++;
            } else if ((a + b + c) < sum) {
                // Check for multiples
                for (int k = 2; (a * k + b * k + c * k) <= sum; ++k) {
                    if ((a * k + b * k + c * k) == sum) {
                        if (count >= capacity) {
                            capacity *= 2;
                            triplet_t *temp_triplets = realloc(triplets, sizeof(triplet_t) * capacity);
                            if (temp_triplets == NULL) {
                                fprintf(stderr, "ERROR: Out of memory reallocating triplets (capacity = %d)\n", capacity);
                                free(triplets);
                                free(result);
                                return NULL;
                            }
                            triplets = temp_triplets;
                        }

                        int new_a = a * k;
                        int new_b = b * k;
                        int new_c = c * k;

                        if (new_a > new_b) {
                            int temp = new_a;
                            new_a = new_b;
                            new_b = temp;
                        }

                        triplets[count].a = new_a;
                        triplets[count].b = new_b;
                        triplets[count].c = new_c;
                        count++;
                    }
                }
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