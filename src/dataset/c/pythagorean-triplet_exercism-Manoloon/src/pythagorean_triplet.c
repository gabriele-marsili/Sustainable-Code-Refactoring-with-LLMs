#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>

triplets_t *triplets_with_sum(int sum)
{
    if(sum < 12) return NULL;
    
    triplets_t* result = malloc(sizeof(triplets_t));
    if(result == NULL) return NULL;
    uint16_t capacity = 64;
    triplet_t* triplets = malloc(sizeof(triplet_t)*capacity);
    if(triplets == NULL)
    {
        free(result);
        return NULL;
    }

    int halfSum = sum / 2;
    uint16_t count = 0;
    for(int m = 2; m < halfSum; m++)
    {
        for(int n = 1; n < m;n++)
        {
            if ((m - n) % 2 == 0 || gcd(m, n) != 1) continue;

            int temp_a = m * m - n * n;
            int temp_b = 2 * m * n;
            int temp_c = m * m + n * n;
            int tempSum = temp_a + temp_b + temp_c;
            
            if(tempSum > sum) continue;

            // looking for more than primitives
            for(int k = 1; k * tempSum <= sum;k++)
            {
                // enlarge the array of triplets if count larger than capacity
                if(count >= capacity)
                {
                    capacity *= 2;
                    triplet_t* temparray = realloc(triplets,sizeof(triplet_t)*capacity);
                    if(temparray == NULL) 
                    {
                        fprintf(stderr,"ERROR Out Of memory for realloc triplets, capacity attempt : %d\n",capacity);
                        free(triplets);
                        free(result);
                        return NULL;
                    }
                    triplets = temparray;
                }
                uint16_t a = temp_a * k;
                uint16_t b = temp_b * k;
                uint16_t c = temp_c * k;
                // sort a and b
                if(a > b)
                {
                    uint16_t temp = b;
                    b = a;
                    a = temp;
                }

                if(k * tempSum != sum) continue;

                triplets[count].a = a;
                triplets[count].b = b;
                triplets[count].c = c;
                count++;
            }
        }
    }
    result->count = count;
    result->triplets = triplets;
    return result;
}

void free_triplets(triplets_t *triplets)
{
    if(triplets == NULL) return;
    free(triplets->triplets);
    free(triplets);
}

// Greater Commond Divisor
int gcd(uint16_t a, uint16_t b)
{
    while (b != 0)
    {
        uint16_t temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
