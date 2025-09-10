#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>

bool is_allergic_to(allergen_t allergen, int score)
{
    return (score >= 0) && (score & (1 << allergen));
}

void get_allergens(int score, allergen_list_t *list)
{
    if (score < 0) {
        fprintf(stderr, "Invalid score\n");
        list->allergens = NULL;
        list->count = 0;
        return;
    }

    int count = 0;
    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        if (score & (1 << i)) {
            count++;
        }
    }

    list->allergens = (allergen_t *) malloc(count * sizeof(allergen_t));
    if (list->allergens == NULL) {
        fprintf(stderr, "Memory error\n");
        list->count = 0;
        return;
    }

    list->count = 0;
    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        if (score & (1 << i)) {
            list->allergens[list->count++] = (allergen_t) i;
        }
    }
}