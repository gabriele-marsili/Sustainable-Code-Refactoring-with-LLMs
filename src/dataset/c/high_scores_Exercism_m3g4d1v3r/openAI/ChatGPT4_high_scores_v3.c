#include "high_scores.h"

#include <stdio.h>
#include <string.h>

int compare(const void *a, const void *b);

int compare(const void *a, const void *b) { return *(int *)b - *(int *)a; }

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return scores[scores_len - 1];
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int32_t best = scores[0];
    for (size_t i = 1; i < scores_len; i++) {
        if (scores[i] > best) {
            best = scores[i];
        }
    }
    return best;
}

/// Write the highest scores to `output` (in non-ascending order).
/// Return the number of scores written.
size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    int32_t top_three[3] = {INT32_MIN, INT32_MIN, INT32_MIN};
    size_t count = scores_len < 3 ? scores_len : 3;

    for (size_t i = 0; i < scores_len; i++) {
        if (scores[i] > top_three[0]) {
            top_three[2] = top_three[1];
            top_three[1] = top_three[0];
            top_three[0] = scores[i];
        } else if (scores[i] > top_three[1]) {
            top_three[2] = top_three[1];
            top_three[1] = scores[i];
        } else if (scores[i] > top_three[2]) {
            top_three[2] = scores[i];
        }
    }

    for (size_t i = 0; i < count; i++) {
        output[i] = top_three[i];
    }

    return count;
}