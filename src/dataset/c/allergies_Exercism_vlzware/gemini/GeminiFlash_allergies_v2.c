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

	// Determine the number of allergens first
	int allergen_count = 0;
	for (int i = 0; i < ALLERGEN_COUNT; ++i) {
		if (score & (1 << i)) {
			allergen_count++;
		}
	}

	list->count = allergen_count;
	list->allergens = (allergen_t *)malloc(allergen_count * sizeof(allergen_t));

	if (list->allergens == NULL) {
		fprintf(stderr, "Memory error\n");
		list->count = 0; // Ensure count is 0 on failure
		return;
	}

	int current_index = 0;
	for (int i = 0; i < ALLERGEN_COUNT; ++i) {
		if (score & (1 << i)) {
			list->allergens[current_index++] = (allergen_t)i;
		}
	}
}