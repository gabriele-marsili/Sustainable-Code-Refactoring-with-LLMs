#include "high_scores.h"

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

static inline int32_t max_of_two(int32_t a, int32_t b) {
    return a > b ? a : b;
}

static inline int32_t max_of_three(int32_t a, int32_t b, int32_t c) {
    return max_of_two(max_of_two(a, b), c);
}

int32_t latest(const int32_t *scores, size_t scores_len) {
    return scores[scores_len - 1];
}

int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int32_t best = scores[0];
    for (size_t i = 1; i < scores_len; i++) {
        if (scores[i] > best) {
            best = scores[i];
        }
    }
    return best;
}

size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    if (scores_len == 0) return 0;
    
    if (scores_len == 1) {
        output[0] = scores[0];
        return 1;
    }
    
    if (scores_len == 2) {
        if (scores[0] >= scores[1]) {
            output[0] = scores[0];
            output[1] = scores[1];
        } else {
            output[0] = scores[1];
            output[1] = scores[0];
        }
        return 2;
    }
    
    int32_t first = scores[0];
    int32_t second = scores[1];
    int32_t third = scores[2];
    
    if (first < second) {
        int32_t temp = first;
        first = second;
        second = temp;
    }
    if (second < third) {
        int32_t temp = second;
        second = third;
        third = temp;
        if (first < second) {
            temp = first;
            first = second;
            second = temp;
        }
    }
    
    for (size_t i = 3; i < scores_len; i++) {
        if (scores[i] > third) {
            if (scores[i] > second) {
                if (scores[i] > first) {
                    third = second;
                    second = first;
                    first = scores[i];
                } else {
                    third = second;
                    second = scores[i];
                }
            } else {
                third = scores[i];
            }
        }
    }
    
    output[0] = first;
    size_t count = 1;
    
    if (scores_len > 1) {
        output[1] = second;
        count = 2;
    }
    
    if (scores_len > 2) {
        output[2] = third;
        count = 3;
    }
    
    return count;
}