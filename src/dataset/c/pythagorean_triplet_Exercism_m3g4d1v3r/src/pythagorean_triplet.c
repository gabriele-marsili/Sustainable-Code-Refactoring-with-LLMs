#include "pythagorean_triplet.h"

triplets_t *triplets_with_sum(int n) {
    triplets_t aux;
    triplets_t *result;

    result = malloc(sizeof(triplets_t));
    aux.count = 0;
    aux.triplets = malloc(sizeof(triplet_t) * MAX_OUTPUT);
    for (int i = 1; i <= n / 2; i++) {
        for (int j = i + 1; j <= n / 2; j++) {
            int k = (n - 1 * (i + j));    // enforces (i + j + k) == n
            if ((pow(i, 2) + pow(j, 2)) == pow(k, 2)) {
                if (aux.count >= MAX_OUTPUT) {
                    return (result);
                }
                aux.triplets[aux.count].a = i;
                aux.triplets[aux.count].b = j;
                aux.triplets[aux.count].c = k;
                aux.count++;
            }
        }
    }
    result->count = aux.count;
    result->triplets = malloc(sizeof(triplet_t) * aux.count);
    for (int idx = 0; idx < aux.count; idx++) {
        result->triplets[idx].a = aux.triplets[idx].a;
        result->triplets[idx].b = aux.triplets[idx].b;
        result->triplets[idx].c = aux.triplets[idx].c;
    }
    free(aux.triplets);
    return (result);
}

void free_triplets(triplets_t *data) {
    free(data->triplets);
    free(data);
}
