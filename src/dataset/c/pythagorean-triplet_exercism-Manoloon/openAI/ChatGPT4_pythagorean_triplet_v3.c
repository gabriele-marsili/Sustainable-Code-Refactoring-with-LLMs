#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>

triplets_t *triplets_with_sum(int sum)
{
    if (sum < 12) return NULL;

    triplets_t *result = malloc(sizeof(triplets_t));
    if (!result) return NULL;

    uint16_t capacity = 64;
    triplet_t *triplets = malloc(sizeof(triplet_t) * capacity);
    if (!triplets)
    {
        free(result);
        return NULL;
    }

    uint16_t count = 0;
    for (int m = 2; m * m < sum; m++)
    {
        if ((sum / 2) % m != 0) continue;

        for (int n = 1; n < m; n++)
        {
            if ((m - n) % 2 == 0 || gcd(m, n) != 1) continue;

            int temp_a = m * m - n * n;
            int temp_b = 2 * m * n;
            int temp_c = m * m + n * n;
            int tempSum = temp_a + temp_b + temp_c;

            if (tempSum > sum || sum % tempSum != 0) continue;

            int k = sum / tempSum;
            uint16_t a = temp_a * k;
            uint16_t b = temp_b * k;
            uint16_t c = temp_c * k;

            if (a > b)
            {
                uint16_t temp = b;
                b = a;
                a = temp;
            }

            if (count >= capacity)
            {
                capacity *= 2;
                triplet_t *temparray = realloc(triplets, sizeof(triplet_t) * capacity);
                if (!temparray)
                {
                    free(triplets);
                    free(result);
                    return NULL;
                }
                triplets = temparray;
            }

            triplets[count].a = a;
            triplets[count].b = b;
            triplets[count].c = c;
            count++;
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