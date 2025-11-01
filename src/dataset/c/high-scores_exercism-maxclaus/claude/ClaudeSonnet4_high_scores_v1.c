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
  
  // Initialize output with minimum values
  for (size_t i = 0; i < out_len; i++) {
    output[i] = INT32_MIN;
  }

  // Find top 3 scores in a single pass
  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];
    
    // Check if score belongs in top 3
    if (score > output[out_len - 1]) {
      // Find insertion position
      size_t pos = 0;
      while (pos < out_len && score <= output[pos]) {
        pos++;
      }
      
      // Shift elements down
      for (size_t j = out_len - 1; j > pos; j--) {
        output[j] = output[j - 1];
      }
      
      // Insert new score
      output[pos] = score;
    }
  }

  return out_len;
}

// First version, built on my own.
size_t personal_top_three_v1(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  const size_t out_len = scores_len < 3 ? scores_len : 3;

  for (size_t i = 0; i < scores_len; i++) {
    int32_t score = scores[i];

    for (size_t li = 0; li < out_len; li++) {
      int32_t top = output[li];

      if (score > top) {
        // Loop backwards over the output score stack
        // moving lower values down the stack
        for (size_t ri = out_len - 1; ri > li; ri--) {
          output[ri] = output[ri - 1];
        }

        // Set the new top score for this position
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

// Second version, based on
// https://exercism.org/tracks/c/exercises/high-scores/solutions/bobahop
// It uses qsort from the standar library for quick sort and copy memory using
// memcpy.
size_t personal_top_three_v2(const int32_t *scores, size_t scores_len,
                             int32_t *output) {
  int32_t sorted_scores[15] = {-1};
  memcpy(sorted_scores, scores, scores_len * sizeof(int32_t));
  qsort((void *)sorted_scores, scores_len, sizeof(int32_t), by_descending);

  size_t len = scores_len < 3 ? scores_len : 3;
  memcpy(output, sorted_scores, len * sizeof(int32_t));

  return len;
}