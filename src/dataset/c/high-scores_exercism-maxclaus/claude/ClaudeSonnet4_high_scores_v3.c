#include "high_scores.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

int32_t latest(const int32_t *scores, size_t scores_len) {
  return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len) {
  if (scores_len == 0) return 0;
  
  int32_t max = scores[0];
  for (size_t i = 1; i < scores_len; i++) {
    if (scores[i] > max) {
      max = scores[i];
    }
  }
  return max;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
  if (scores_len == 0) return 0;
  
  const size_t result_len = scores_len < 3 ? scores_len : 3;
  
  for (size_t i = 0; i < result_len; i++) {
    output[i] = INT32_MIN;
  }
  
  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];
    
    for (size_t j = 0; j < result_len; j++) {
      if (score > output[j]) {
        for (size_t k = result_len - 1; k > j; k--) {
          output[k] = output[k - 1];
        }
        output[j] = score;
        break;
      }
    }
  }
  
  return result_len;
}

size_t personal_top_three_v1(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  if (scores_len == 0) return 0;
  
  const size_t out_len = scores_len < 3 ? scores_len : 3;
  
  for (size_t i = 0; i < out_len; i++) {
    output[i] = INT32_MIN;
  }

  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];

    for (size_t li = 0; li < out_len; li++) {
      if (score > output[li]) {
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
  const int32_t a = *(const int32_t *)lhs;
  const int32_t b = *(const int32_t *)rhs;
  return (b > a) - (b < a);
}

size_t personal_top_three_v2(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  if (scores_len == 0) return 0;
  
  int32_t *sorted_scores = malloc(scores_len * sizeof(int32_t));
  if (!sorted_scores) return 0;
  
  memcpy(sorted_scores, scores, scores_len * sizeof(int32_t));
  qsort(sorted_scores, scores_len, sizeof(int32_t), by_descending);

  const size_t len = scores_len < 3 ? scores_len : 3;
  memcpy(output, sorted_scores, len * sizeof(int32_t));
  
  free(sorted_scores);
  return len;
}