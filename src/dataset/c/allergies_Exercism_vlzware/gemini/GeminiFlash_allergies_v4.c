#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

bool is_allergic_to(allergen_t allergen, int score)
{
	if (score < 0) {
		fprintf(stderr, "Invalid score\n");
		return false;
	}
	return (score & (1 << allergen)) != 0;
}

void get_allergens(int score, allergen_list_t *list)
{
	if (score < 0) {
		fprintf(stderr, "Invalid score\n");
		return;
	}

	list->count = 0;
	allergen_t allergens[ALLERGEN_COUNT];

	for (int i = 0; i < ALLERGEN_COUNT; ++i) {
		if ((score & (1 << i)) != 0) {
			allergens[list->count++] = (allergen_t)i;
		}
	}

	list->allergens = (allergen_t *)malloc(list->count * sizeof(allergen_t));
	if (list->allergens == NULL) {
		fprintf(stderr, "Memory error\n");
		list->count = 0;
		return;
	}

	for (int i = 0; i < list->count; ++i) {
		list->allergens[i] = allergens[i];
	}
}