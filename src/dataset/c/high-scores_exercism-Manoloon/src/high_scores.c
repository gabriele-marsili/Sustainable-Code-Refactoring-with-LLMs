#include "high_scores.h"
#include <stdlib.h>

int32_t latest(const int32_t *scores, size_t scores_len)
{
    return scores[scores_len-1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len)
{
    int32_t best = 0;
    for(size_t i = 0; i < scores_len; ++i)
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
        return scores_len;
    } 
    size_t ResultsNum = (scores_len < 3) ? scores_len : 3;
    const int32_t* tempScores[scores_len];
    for(size_t i = 0; i < scores_len; ++i)
    {
        tempScores[i] = &scores[i];
    }
    qsort(tempScores,scores_len,sizeof(int32_t*),compare);

    for(size_t i = 0 ; i < ResultsNum; ++i)
    {
        output[i] = *tempScores[i];
    }
    return ResultsNum;
}

int compare(const void* a, const void* b)
{
    const int32_t* int_a = *(const int32_t**) a;
    const int32_t* int_b = *(const int32_t**) b;
    
    return (*int_b - *int_a);
}
