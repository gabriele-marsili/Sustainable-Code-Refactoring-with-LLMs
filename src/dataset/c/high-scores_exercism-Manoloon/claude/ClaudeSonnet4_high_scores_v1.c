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
    
    if(scores_len == 2)
    {
        if(scores[0] >= scores[1])
        {
            output[0] = scores[0];
            output[1] = scores[1];
        }
        else
        {
            output[0] = scores[1];
            output[1] = scores[0];
        }
        return 2;
    }
    
    // Find top 3 using selection algorithm
    int32_t first = scores[0], second = INT32_MIN, third = INT32_MIN;
    
    for(size_t i = 1; i < scores_len; ++i)
    {
        if(scores[i] > first)
        {
            third = second;
            second = first;
            first = scores[i];
        }
        else if(scores[i] > second)
        {
            third = second;
            second = scores[i];
        }
        else if(scores[i] > third)
        {
            third = scores[i];
        }
    }
    
    output[0] = first;
    size_t count = 1;
    if(second != INT32_MIN)
    {
        output[1] = second;
        count = 2;
        if(third != INT32_MIN)
        {
            output[2] = third;
            count = 3;
        }
    }
    
    return count;
}

int compare(const void* a, const void* b)
{
    const int32_t* int_a = *(const int32_t**) a;
    const int32_t* int_b = *(const int32_t**) b;
    
    return (*int_b - *int_a);
}