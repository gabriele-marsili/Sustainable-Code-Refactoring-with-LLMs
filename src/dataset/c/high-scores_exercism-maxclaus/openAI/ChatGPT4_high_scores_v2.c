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
  return personal_top_three_v2(scores, scores_len, output);
}

static void insert_sorted(int32_t *output, size_t len, int32_t score) {
  size_t i = len;
  while (i > 0 && output[i - 1] < score) {
    if (i < 3) {
      output[i] = output[i - 1];
    }
    i--;
  }
  if (i < 3) {
    output[i] = score;
  }
}

// Optimized version of personal_top_three_v1
size_t personal_top_three_v1(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  size_t out_len = 0;

  for (size_t i = 0; i < scores_len; i++) {
    insert_sorted(output, out_len, scores[i]);
    if (out_len < 3) {
      out_len++;
    }
  }

  return out_len;
}

// Optimized version of personal_top_three_v2
size_t personal_top_three_v2(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  int32_t top_three[3] = {INT32_MIN, INT32_MIN, INT32_MIN};
  size_t len = scores_len < 3 ? scores_len : 3;

  for (size_t i = 0; i < scores_len; i++) {
    insert_sorted(top_three, len, scores[i]);
  }

  memcpy(output, top_three, len * sizeof(int32_t));
  return len;
}