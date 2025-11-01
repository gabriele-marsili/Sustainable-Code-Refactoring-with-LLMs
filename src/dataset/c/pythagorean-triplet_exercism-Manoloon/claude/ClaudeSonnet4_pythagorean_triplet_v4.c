#include "pythagorean_triplet.h"
#include <stdlib.h>
#include <stdio.h>

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
    int sum_half = sum >> 1;
    int m_limit = 1;
    while(m_limit * m_limit < sum_half) m_limit++;
    
    for(int m = 2; m <= m_limit; m++)
    {
        int m_sq = m * m;
        int n_limit = (m > sum_half / m) ? sum_half / m : m - 1;
        
        for(int n = 1 + (m & 1); n <= n_limit; n += 2)
        {
            if(gcd(m, n) != 1) continue;

            int n_sq = n * n;
            int temp_a = m_sq - n_sq;
            int temp_b = (m * n) << 1;
            int temp_c = m_sq + n_sq;
            int tempSum = temp_a + temp_b + temp_c;
            
            if(tempSum > sum) break;
            if(sum % tempSum != 0) continue;

            if(count >= capacity)
            {
                capacity <<= 1;
                triplet_t* temparray = realloc(triplets, sizeof(triplet_t) * capacity);
                if(temparray == NULL) 
                {
                    free(triplets);
                    free(result);
                    return NULL;
                }
                triplets = temparray;
            }

            int k = sum / tempSum;
            uint16_t a = temp_a * k;
            uint16_t b = temp_b * k;
            uint16_t c = temp_c * k;
            
            if(a > b)
            {
                uint16_t temp = a;
                a = b;
                b = temp;
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
        uint16_t temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}