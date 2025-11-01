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

// First version, built on my own.
size_t personal_top_three_v1(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  const size_t out_len = scores_len < 3 ? scores_len : 3;

  for (size_t i = 0; i < out_len; i++) {
    output[i] = INT32_MIN;
  }

  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];

    for (size_t li = 0; li < out_len; li++) {
      if (score > output[li]) {
        // Shift elements down and insert the new score
        memmove(&output[li + 1], &output[li], (out_len - li - 1) * sizeof(int32_t));
        output[li] = score;
        break;
      }
    }
  }

  return out_len;
}

static int by_descending(const void *lhs, const void *rhs) {
  return *(const int32_t *)rhs - *(const int32_t *)lhs;
}

// Second version, optimized for performance and memory usage.
size_t personal_top_three_v2(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  if (scores_len == 0) {
    return 0;
  }

  size_t len = scores_len < 3 ? scores_len : 3;
  int32_t top_three[3] = {INT32_MIN, INT32_MIN, INT32_MIN};

  for (size_t i = 0; i < scores_len; i++) {
    if (scores[i] > top_three[0]) {
      top_three[2] = top_three[1];
      top_three[1] = top_three[0];
      top_three[0] = scores[i];
    } else if (scores[i] > top_three[1]) {
      top_three[2] = top_three[1];
      top_three[1] = scores[i];
    } else if (scores[i] > top_three[2]) {
      top_three[2] = scores[i];
    }
  }

  memcpy(output, top_three, len * sizeof(int32_t));
  return len;
}