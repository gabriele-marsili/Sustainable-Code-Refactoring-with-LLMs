#include "high_scores.h"
#include <stdlib.h>

int32_t latest(const int32_t *scores, size_t scores_len)
{
    return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len)
{
    int32_t best = scores[0];
    for (size_t i = 1; i < scores_len; ++i)
    {
        if (scores[i] > best)
        {
            best = scores[i];
        }
    }
    return best;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len, int32_t *output)
{
    if (scores_len == 0) return 0;

    size_t ResultsNum = (scores_len < 3) ? scores_len : 3;
    int32_t top_three[3] = {INT32_MIN, INT32_MIN, INT32_MIN};

    for (size_t i = 0; i < scores_len; ++i)
    {
        if (scores[i] > top_three[0])
        {
            top_three[2] = top_three[1];
            top_three[1] = top_three[0];
            top_three[0] = scores[i];
        }
        else if (scores[i] > top_three[1])
        {
            top_three[2] = top_three[1];
            top_three[1] = scores[i];
        }
        else if (scores[i] > top_three[2])
        {
            top_three[2] = scores[i];
        }
    }

    for (size_t i = 0; i < ResultsNum; ++i)
    {
        output[i] = top_three[i];
    }
    return ResultsNum;
}