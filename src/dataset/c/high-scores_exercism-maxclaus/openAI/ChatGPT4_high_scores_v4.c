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
  int32_t top[3] = {INT32_MIN, INT32_MIN, INT32_MIN};

  for (size_t i = 0; i < scores_len; i++) {
    if (scores[i] > top[0]) {
      top[2] = top[1];
      top[1] = top[0];
      top[0] = scores[i];
    } else if (scores[i] > top[1]) {
      top[2] = top[1];
      top[1] = scores[i];
    } else if (scores[i] > top[2]) {
      top[2] = scores[i];
    }
  }

  for (size_t i = 0; i < len; i++) {
    output[i] = top[i];
  }

  return len;
}