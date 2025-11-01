#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>

triplets_t *triplets_with_sum(int sum)
{
    if (sum < 12) return NULL;

    triplets_t* result = malloc(sizeof(triplets_t));
    if (!result) return NULL;

    uint16_t capacity = 64;
    uint16_t count = 0;
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

            int temp_a = m * m - n * n;
            int temp_b = 2 * m * n;
            int temp_c = m * m + n * n;

            if (temp_a + temp_b + temp_c != sum) continue;

            if (count >= capacity)
            {
                capacity *= 2;
                triplet_t* temparray = realloc(triplets, sizeof(triplet_t) * capacity);
                if (!temparray)
                {
                    free(triplets);
                    free(result);
                    return NULL;
                }
                triplets = temparray;
            }

            if (temp_a > temp_b)
            {
                int temp = temp_b;
                temp_b = temp_a;
                temp_a = temp;
            }

            triplets[count].a = temp_a;
            triplets[count].b = temp_b;
            triplets[count].c = temp_c;
            count++;
        }
    }

    result->count = count;
    result->triplets = triplets;
    return result;
}

void free_triplets(triplets_t *triplets)
{
    if (!triplets) return;
    free(triplets->triplets);
    free(triplets);
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