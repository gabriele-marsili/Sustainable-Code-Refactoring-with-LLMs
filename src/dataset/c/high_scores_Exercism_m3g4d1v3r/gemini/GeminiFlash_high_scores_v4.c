#include "high_scores.h"

#include <algorithm>
#include <vector>

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return (scores[scores_len - 1]);
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int32_t best = 0;
    for (size_t i = 0; i < scores_len; ++i) {
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
    std::vector<int32_t> sorted_scores(scores, scores + scores_len);
    std::sort(sorted_scores.begin(), sorted_scores.end(), std::greater<int32_t>());

    size_t count = 0;
    for (size_t i = 0; i < scores_len && i < 3; ++i) {
        output[i] = sorted_scores[i];
        count++;
    }
    return count;
}