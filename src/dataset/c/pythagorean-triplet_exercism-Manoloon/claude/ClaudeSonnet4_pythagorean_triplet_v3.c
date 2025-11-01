#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>
#include <math.h>

triplets_t *triplets_with_sum(int sum)
{
    if(sum < 12) return NULL;
    
    triplets_t* result = malloc(sizeof(triplets_t));
    if(result == NULL) return NULL;
    
    uint16_t capacity = 16;
    triplet_t* triplets = malloc(sizeof(triplet_t) * capacity);
    if(triplets == NULL)
    {
        free(result);
        return NULL;
    }

    uint16_t count = 0;
    int max_m = (int)sqrt(sum / 2) + 1;
    
    for(int m = 2; m <= max_m; m++)
    {
        int max_n = (m > sum / (2 * m)) ? sum / (2 * m) : m - 1;
        for(int n = 1; n <= max_n; n++)
        {
            if ((m - n) % 2 == 0 || gcd(m, n) != 1) continue;

            int temp_a = m * m - n * n;
            int temp_b = 2 * m * n;
            int temp_c = m * m + n * n;
            int primitive_sum = temp_a + temp_b + temp_c;
            
            if(primitive_sum > sum) break;
            if(sum % primitive_sum != 0) continue;
            
            int k = sum / primitive_sum;
            
            if(count >= capacity)
            {
                capacity *= 2;
                triplet_t* temparray = realloc(triplets, sizeof(triplet_t) * capacity);
                if(temparray == NULL) 
                {
                    free(triplets);
                    free(result);
                    return NULL;
                }
                triplets = temparray;
            }
            
            uint16_t a = temp_a * k;
            uint16_t b = temp_b * k;
            uint16_t c = temp_c * k;
            
            if(a > b)
            {
                uint16_t temp = b;
                b = a;
                a = temp;
            }

            triplets[count].a = a;
            triplets[count].b = b;
            triplets[count].c = c;
            count++;
        }
    }
    
    if(count < capacity)
    {
        triplet_t* final_triplets = realloc(triplets, sizeof(triplet_t) * count);
        if(final_triplets != NULL || count == 0)
        {
            triplets = final_triplets;
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