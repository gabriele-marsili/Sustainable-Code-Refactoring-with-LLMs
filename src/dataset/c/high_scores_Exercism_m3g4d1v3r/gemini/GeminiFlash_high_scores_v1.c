#include "high_scores.h"

#include <stdio.h>
#include <stdlib.h> // Required for malloc and free

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return (scores[scores_len - 1]);
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    if (scores_len == 0) return 0; // Handle empty array case

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

    // Use a simple selection sort to find the top three scores.
    // This avoids allocating memory.
    int32_t top_scores[3] = {0};
    size_t num_top_scores = 0;

    for (size_t i = 0; i < scores_len; ++i) {
        if (num_top_scores < 3) {
            top_scores[num_top_scores++] = scores[i];
            // Insertion sort to maintain non-ascending order
            for (size_t j = num_top_scores - 1; j > 0 && top_scores[j] > top_scores[j - 1]; --j) {
                int32_t temp = top_scores[j];
                top_scores[j] = top_scores[j - 1];
                top_scores[j - 1] = temp;
            }
        } else if (scores[i] > top_scores[2]) {
            top_scores[2] = scores[i];
            // Insertion sort to maintain non-ascending order
            for (size_t j = 2; j > 0 && top_scores[j] > top_scores[j - 1]; --j) {
                int32_t temp = top_scores[j];
                top_scores[j] = top_scores[j - 1];
                top_scores[j - 1] = temp;
            }
        }
    }

    // Copy the top scores to the output array.
    for (size_t i = 0; i < num_top_scores; ++i) {
        output[i] = top_scores[i];
    }

    return num_top_scores;
}