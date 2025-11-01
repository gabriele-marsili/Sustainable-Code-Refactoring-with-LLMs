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
    for (size_t i = 0; i < ResultsNum; ++i)
    {
        output[i] = scores[i];
    }

    for (size_t i = ResultsNum; i < scores_len; ++i)
    {
        int32_t min_val = output[0];
        size_t min_idx = 0;
        for (size_t j = 1; j < ResultsNum; ++j)
        {
            if (output[j] < min_val)
            {
                min_val = output[j];
                min_idx = j;
            }
        }
        if (scores[i] > min_val)
        {
            output[min_idx] = scores[i];
        }
    }

    for (size_t i = 0; i < ResultsNum - 1; ++i)
    {
        for (size_t j = i + 1; j < ResultsNum; ++j)
        {
            if (output[j] > output[i])
            {
                int32_t temp = output[i];
                output[i] = output[j];
                output[j] = temp;
            }
        }
    }

    return ResultsNum;
}