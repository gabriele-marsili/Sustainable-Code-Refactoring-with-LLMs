#include "high_scores.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return (scores[scores_len - 1]);
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    if (scores_len == 0) return 0;

    int32_t max_score = scores[0];
    for (size_t i = 1; i < scores_len; ++i) {
        if (scores[i] > max_score) {
            max_score = scores[i];
        }
    }
    return max_score;
}

/// Write the highest scores to `output` (in non-ascending order).
/// Return the number of scores written.
size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    if (scores_len == 0) return 0;

    int32_t top_scores[3] = {0, 0, 0};
    size_t count = 0;

    for (size_t i = 0; i < scores_len; ++i) {
        if (scores[i] > top_scores[0]) {
            top_scores[2] = top_scores[1];
            top_scores[1] = top_scores[0];
            top_scores[0] = scores[i];
        } else if (scores[i] > top_scores[1]) {
            top_scores[2] = top_scores[1];
            top_scores[1] = scores[i];
        } else if (scores[i] > top_scores[2]) {
            top_scores[2] = scores[i];
        }
    }

    for (int i = 0; i < 3 && i < scores_len; ++i) {
        output[i] = top_scores[i];
        count++;
    }

    return count;
}