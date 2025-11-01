#include "high_scores.h"
#include <limits.h>
#include <stddef.h>

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
  return scores[scores_len - 1];
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
  int32_t max = INT_MIN;

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
  int32_t top_scores[3] = {INT_MIN, INT_MIN, INT_MIN};

  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];

    if (score > top_scores[0]) {
      top_scores[2] = top_scores[1];
      top_scores[1] = top_scores[0];
      top_scores[0] = score;
    } else if (score > top_scores[1]) {
      top_scores[2] = top_scores[1];
      top_scores[1] = score;
    } else if (score > top_scores[2]) {
      top_scores[2] = score;
    }
  }

  size_t count = 0;
  for (size_t i = 0; i < 3 && i < scores_len; ++i) {
    if (top_scores[i] != INT_MIN) {
      output[i] = top_scores[i];
      count++;
    }
  }
    
  if (scores_len < 3) {
        count = scores_len;
  }

  return count;
}