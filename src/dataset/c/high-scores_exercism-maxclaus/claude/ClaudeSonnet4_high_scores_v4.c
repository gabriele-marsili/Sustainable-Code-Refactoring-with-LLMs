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
  const size_t out_len = scores_len < 3 ? scores_len : 3;
  
  output[0] = output[1] = output[2] = INT32_MIN;
  
  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];
    
    if (score > output[0]) {
      output[2] = output[1];
      output[1] = output[0];
      output[0] = score;
    } else if (score > output[1]) {
      output[2] = output[1];
      output[1] = score;
    } else if (score > output[2]) {
      output[2] = score;
    }
  }

  return out_len;
}

size_t personal_top_three_v1(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  const size_t out_len = scores_len < 3 ? scores_len : 3;

  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];

    for (size_t li = 0; li < out_len; li++) {
      int32_t top = output[li];

      if (score > top) {
        for (size_t ri = out_len - 1; ri > li; ri--) {
          output[ri] = output[ri - 1];
        }

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

size_t personal_top_three_v2(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  int32_t sorted_scores[15] = {-1};
  memcpy(sorted_scores, scores, scores_len * sizeof(int32_t));
  qsort((void *)sorted_scores, scores_len, sizeof(int32_t), by_descending);

  size_t len = scores_len < 3 ? scores_len : 3;
  memcpy(output, sorted_scores, len * sizeof(int32_t));

  return len;
}