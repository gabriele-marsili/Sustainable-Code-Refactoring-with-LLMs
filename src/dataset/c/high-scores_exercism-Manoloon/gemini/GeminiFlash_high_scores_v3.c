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

static inline void swap(int32_t *a, int32_t *b) {
  int32_t temp = *a;
  *a = *b;
  *b = temp;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len,
                           int32_t *output) {
  if (scores_len == 0)
    return 0;

  size_t results_num = (scores_len < 3) ? scores_len : 3;

  // Initialize output with the first three scores or fewer if scores_len < 3
  for (size_t i = 0; i < results_num; ++i) {
    output[i] = scores[i];
  }

  // Use insertion sort to maintain the top three scores in descending order
  for (size_t i = results_num; i < scores_len; ++i) {
    if (scores[i] > output[results_num - 1]) {
      output[results_num - 1] = scores[i];

      // Shift elements to maintain descending order
      for (size_t j = results_num - 1; j > 0 && output[j] > output[j - 1];
           --j) {
        swap(&output[j], &output[j - 1]);
      }
    }
  }

  return results_num;
}