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
		list->count = 0;
		list->allergens = NULL;
		return;
	}

	list->count = 0;
	for (int i = 0; i < ALLERGEN_COUNT; i++) {
		if ((score & (1 << i)) != 0) {
			list->count++;
		}
	}

	list->allergens = (allergen_t *)malloc(list->count * sizeof(allergen_t));
	if (list->allergens == NULL && list->count > 0) {
		fprintf(stderr, "Memory error\n");
		list->count = 0;
		return;
	}

	int allergen_index = 0;
	for (int i = 0; i < ALLERGEN_COUNT; i++) {
		if ((score & (1 << i)) != 0) {
			list->allergens[allergen_index++] = (allergen_t)i;
		}
	}
}