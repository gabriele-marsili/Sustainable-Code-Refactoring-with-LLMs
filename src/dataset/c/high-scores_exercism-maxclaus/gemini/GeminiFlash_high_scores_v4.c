#include "high_scores.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
  return scores[scores_len - 1];
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
  int32_t max = 0;

  for (size_t i = 0; i < scores_len; i++) {
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
  size_t len = scores_len < 3 ? scores_len : 3;

  // Initialize output array with minimum possible value
  for (size_t i = 0; i < len; ++i) {
    output[i] = -1;
  }

  for (size_t i = 0; i < scores_len; ++i) {
    int32_t score = scores[i];

    for (size_t j = 0; j < len; ++j) {
      if (score > output[j]) {
        // Shift elements down to make space for the new top score
        for (size_t k = len - 1; k > j; --k) {
          output[k] = output[k - 1];
        }
        output[j] = score;
        break; // No need to check other positions in output
      }
    }
  }

  return len;
}