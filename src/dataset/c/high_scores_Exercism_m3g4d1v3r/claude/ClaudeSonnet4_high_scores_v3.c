#include "high_scores.h"

#include <stdio.h>
#include <string.h>

static int compare_desc(const void *a, const void *b) {
    int32_t val_a = *(const int32_t *)a;
    int32_t val_b = *(const int32_t *)b;
    return (val_a < val_b) - (val_a > val_b);
}

int32_t latest(const int32_t *scores, size_t scores_len) {
    return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int32_t max_score = scores[0];
    for (size_t i = 1; i < scores_len; i++) {
        if (scores[i] > max_score) {
            max_score = scores[i];
        }
    }
    return max_score;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    if (scores_len == 0) return 0;
    
    int32_t top_three[3] = {INT32_MIN, INT32_MIN, INT32_MIN};
    size_t count = 0;
    
    for (size_t i = 0; i < scores_len; i++) {
        int32_t current = scores[i];
        if (current > top_three[0]) {
            top_three[2] = top_three[1];
            top_three[1] = top_three[0];
            top_three[0] = current;
        } else if (current > top_three[1]) {
            top_three[2] = top_three[1];
            top_three[1] = current;
        } else if (current > top_three[2]) {
            top_three[2] = current;
        }
    }
    
    for (int i = 0; i < 3 && count < scores_len; i++) {
        if (top_three[i] != INT32_MIN) {
            output[count++] = top_three[i];
        }
    }
    
    return count;
}