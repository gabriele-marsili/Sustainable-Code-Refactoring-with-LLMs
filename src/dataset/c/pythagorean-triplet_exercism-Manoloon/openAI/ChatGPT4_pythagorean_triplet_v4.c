#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>

triplets_t *triplets_with_sum(int sum)
{
    if (sum < 12 || sum % 2 != 0) return NULL;

    triplets_t* result = malloc(sizeof(triplets_t));
    if (!result) return NULL;

    uint16_t capacity = 64, count = 0;
    triplet_t* triplets = malloc(sizeof(triplet_t) * capacity);
    if (!triplets)
    {
        free(result);
        return NULL;
    }

    int halfSum = sum / 2;
    for (int m = 2; m * m < sum; m++)
    {
        if (sum % (2 * m) != 0) continue;

        int k = sum / (2 * m);
        for (int n = 1; n < m && n < k; n++)
        {
            if ((m - n) % 2 == 0 || gcd(m, n) != 1) continue;

            int a = m * m - n * n;
            int b = 2 * m * n;
            int c = m * m + n * n;

            if (a + b + c != sum) continue;

            if (count >= capacity)
            {
                capacity *= 2;
                triplet_t* temp = realloc(triplets, sizeof(triplet_t) * capacity);
                if (!temp)
                {
                    free(triplets);
                    free(result);
                    return NULL;
                }
                triplets = temp;
            }

            if (a > b)
            {
                int temp = a;
                a = b;
                b = temp;
            }

            triplets[count++] = (triplet_t){a, b, c};
        }
    }

    result->count = count;
    result->triplets = triplets;
    return result;
}

void free_triplets(triplets_t *triplets)
{
    if (triplets)
    {
        free(triplets->triplets);
        free(triplets);
    }
}

int gcd(uint16_t a, uint16_t b)
{
    while (b)
    {
        uint16_t temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}