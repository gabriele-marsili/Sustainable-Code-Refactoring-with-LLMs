#include "high_scores.h"

#include <stdio.h>
#include <string.h>

int compare(const void *a, const void *b);

int compare(const void *a, const void *b) { return *(int *)a >= *(int *)b; }

/// Return the latest score.
int32_t latest(const int32_t *scores, size_t scores_len) {
    return (scores[scores_len - 1]);
}

/// Return the highest score.
int32_t personal_best(const int32_t *scores, size_t scores_len) {
    int *aux_array = malloc(sizeof(int) * scores_len);
    int32_t personal_best;

    memcpy(aux_array, scores, sizeof(const int32_t) * scores_len);
    qsort(aux_array, scores_len, sizeof(int), compare);
    personal_best = aux_array[scores_len - 1];
    free(aux_array);
    return (personal_best);
}

/// Write the highest scores to `output` (in non-ascending order).
/// Return the number of scores written.
size_t personal_top_three(const int32_t *scores, size_t scores_len,
                          int32_t *output) {
    int *aux_array = malloc(sizeof(int) * scores_len);
    int written_counter = 0;

    if (scores_len == 0) return (0);
    memcpy(aux_array, scores, sizeof(const int32_t) * scores_len);
    qsort(aux_array, scores_len, sizeof(int), compare);
    for (int score_idx = 1;
         score_idx <= 3 && ((int)scores_len - score_idx) >= 0; score_idx++) {
        *(output++) = aux_array[scores_len - score_idx];
        written_counter++;
    }
    free(aux_array);
    return (written_counter);
}
