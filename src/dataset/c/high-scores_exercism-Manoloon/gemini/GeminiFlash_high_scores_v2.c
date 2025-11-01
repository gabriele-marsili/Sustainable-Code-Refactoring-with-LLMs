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

  size_t results_num = (scores_len < 3) ? scores_len : 3;

  // Use a local array to avoid dynamic allocation.  If scores_len is very
  // large, consider a different approach (e.g., partial sorting).
  int32_t temp_scores[3];
  memset(temp_scores, 0, sizeof(temp_scores)); // Initialize to 0

  for (size_t i = 0; i < scores_len; ++i) {
    if (scores[i] > temp_scores[0]) {
      temp_scores[2] = temp_scores[1];
      temp_scores[1] = temp_scores[0];
      temp_scores[0] = scores[i];
    } else if (scores[i] > temp_scores[1]) {
      temp_scores[2] = temp_scores[1];
      temp_scores[1] = scores[i];
    } else if (scores[i] > temp_scores[2]) {
      temp_scores[2] = scores[i];
    }
  }

  for (size_t i = 0; i < results_num; ++i) {
    output[i] = temp_scores[i];
  }

  return results_num;
}