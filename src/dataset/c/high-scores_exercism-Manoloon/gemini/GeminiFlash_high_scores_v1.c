#include "high_scores.h"
#include <stdlib.h>
#include <limits.h>

int32_t latest(const int32_t *scores, size_t scores_len) {
  return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len) {
  int32_t best = INT_MIN;
  for (size_t i = 0; i < scores_len; ++i) {
    if (scores[i] > best) {
      best = scores[i];
    }
  }
  return best;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len,
                           int32_t *output) {
  if (scores_len == 0)
    return 0;

  size_t count = (scores_len < 3) ? scores_len : 3;

  // Initialize top three with smallest possible value
  output[0] = output[1] = output[2] = INT_MIN;

  for (size_t i = 0; i < scores_len; ++i) {
    if (scores[i] > output[0]) {
      output[2] = output[1];
      output[1] = output[0];
      output[0] = scores[i];
    } else if (scores[i] > output[1]) {
      output[2] = output[1];
      output[1] = scores[i];
    } else if (scores[i] > output[2]) {
      output[2] = scores[i];
    }
  }

  // Adjust count if any of the top scores are still INT_MIN (meaning less than 3 unique scores)
    if (count > 0 && output[0] == INT_MIN) count = 0;
    else if (count > 1 && output[1] == INT_MIN) count = 1;
    else if (count > 2 && output[2] == INT_MIN) count = 2;

  return count;
}