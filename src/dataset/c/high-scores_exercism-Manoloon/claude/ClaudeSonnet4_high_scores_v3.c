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
    
    size_t results_num = (scores_len < 3) ? scores_len : 3;
    
    for(size_t i = 0; i < results_num; ++i)
    {
        output[i] = scores[0];
    }
    
    for(size_t i = 0; i < scores_len; ++i)
    {
        int32_t current = scores[i];
        
        for(size_t j = 0; j < results_num; ++j)
        {
            if(current > output[j])
            {
                for(size_t k = results_num - 1; k > j; --k)
                {
                    output[k] = output[k-1];
                }
                output[j] = current;
                break;
            }
        }
    }
    
    return results_num;
}

int compare(const void* a, const void* b)
{
    const int32_t* int_a = *(const int32_t**) a;
    const int32_t* int_b = *(const int32_t**) b;
    
    return (*int_b - *int_a);
}