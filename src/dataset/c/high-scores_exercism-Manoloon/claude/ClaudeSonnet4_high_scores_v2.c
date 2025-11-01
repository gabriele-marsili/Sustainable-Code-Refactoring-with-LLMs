#include "high_scores.h"
#include <stdlib.h>

int32_t latest(const int32_t *scores, size_t scores_len)
{
    return scores[scores_len-1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len)
{
    if(scores_len == 0) return 0;
    
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
    
    size_t result_num = (scores_len < 3) ? scores_len : 3;
    
    // Find top 3 using partial selection sort
    for(size_t i = 0; i < result_num; ++i)
    {
        int32_t max_val = scores[i];
        size_t max_idx = i;
        
        for(size_t j = i + 1; j < scores_len; ++j)
        {
            if(scores[j] > max_val)
            {
                max_val = scores[j];
                max_idx = j;
            }
        }
        
        output[i] = max_val;
        
        // Swap to avoid finding same element again
        if(max_idx != i)
        {
            int32_t temp = scores[i];
            *((int32_t*)&scores[i]) = scores[max_idx];
            *((int32_t*)&scores[max_idx]) = temp;
        }
    }
    
    return result_num;
}