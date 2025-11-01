#include "high_scores.h"
#include <stdlib.h>
#include <string.h>

int32_t latest(const int32_t *scores, size_t scores_len) {
  return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len) {
  int32_t best = 0;
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

  // Use a simple sorting approach for top 3, avoiding full qsort
  int32_t top_scores[3] = {0, 0, 0};

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

  for (size_t i = 0; i < count; ++i) {
    output[i] = top_scores[i];
  }

  return count;
}