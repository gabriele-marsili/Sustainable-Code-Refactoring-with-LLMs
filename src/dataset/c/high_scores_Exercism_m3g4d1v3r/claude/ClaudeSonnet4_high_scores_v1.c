#include "high_scores.h"

#include <stdio.h>
#include <string.h>

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return scores[scores_len - 1];
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int32_t max = scores[0];
    for (size_t i = 1; i < scores_len; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    return max;
}

/// Write the highest scores to `output` (in non-ascending order).
/// Return the number of scores written.
size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    if (scores_len == 0) return 0;
    
    int32_t first = INT32_MIN, second = INT32_MIN, third = INT32_MIN;
    
    for (size_t i = 0; i < scores_len; i++) {
        if (scores[i] > first) {
            third = second;
            second = first;
            first = scores[i];
        } else if (scores[i] > second) {
            third = second;
            second = scores[i];
        } else if (scores[i] > third) {
            third = scores[i];
        }
    }
    
    size_t written = 0;
    output[written++] = first;
    
    if (scores_len > 1 && second != INT32_MIN) {
        output[written++] = second;
    }
    
    if (scores_len > 2 && third != INT32_MIN) {
        output[written++] = third;
    }
    
    return written;
}