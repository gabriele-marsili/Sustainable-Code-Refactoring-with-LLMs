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
  size_t len = scores_len < 3 ? scores_len : 3;
  for (size_t i = 0; i < len; i++) {
    size_t max_idx = i;
    for (size_t j = i + 1; j < scores_len; j++) {
      if (scores[j] > scores[max_idx]) {
        max_idx = j;
      }
    }
    if (max_idx != i) {
      int32_t temp = scores[i];
      ((int32_t *)scores)[i] = scores[max_idx];
      ((int32_t *)scores)[max_idx] = temp;
    }
    output[i] = scores[i];
  }
  return len;
}