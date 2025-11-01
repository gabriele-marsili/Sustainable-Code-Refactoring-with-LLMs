#include "high_scores.h"
#include <stdlib.h>

int32_t latest(const int32_t *scores, size_t scores_len)
{
    return scores[scores_len-1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len)
{
    if (scores_len == 0) return 0;
    
    int32_t best = scores[0];
    for(size_t i = 1; i < scores_len; ++i)
    {
        if(scores[i] > best)
        {
            best = scores[i];
        }
    }
    return best;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len, int32_t *output)
{
    if(scores_len == 0) return 0;
    
    if(scores_len == 1)
    {
        output[0] = scores[0];
        return 1;
    }
    
    size_t result_count = (scores_len < 3) ? scores_len : 3;
    
    for(size_t i = 0; i < result_count; ++i)
    {
        output[i] = scores[0];
        size_t max_idx = 0;
        
        for(size_t j = 1; j < scores_len; ++j)
        {
            int32_t current = scores[j];
            int skip = 0;
            
            for(size_t k = 0; k < i; ++k)
            {
                if(current == output[k])
                {
                    skip = 1;
                    break;
                }
            }
            
            if(!skip && current > output[i])
            {
                output[i] = current;
                max_idx = j;
            }
        }
    }
    
    return result_count;
}

int compare(const void* a, const void* b)
{
    const int32_t* int_a = *(const int32_t**) a;
    const int32_t* int_b = *(const int32_t**) b;
    
    return (*int_b - *int_a);
}