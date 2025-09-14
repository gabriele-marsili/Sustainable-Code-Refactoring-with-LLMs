#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>

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
	
	if (score == 0) {
		list->allergens = NULL;
		return;
	}

	int temp_score = score;
	while (temp_score) {
		list->count++;
		temp_score &= temp_score - 1;
	}

	list->allergens = (allergen_t *) malloc(list->count * sizeof(allergen_t));
	if (list->allergens == NULL) {
		fprintf(stderr, "Memory error\n");
		list->count = 0;
		return;
	}

	int index = 0;
	for (int i = 0; i < ALLERGEN_COUNT && index < list->count; i++) {
		if (score & (1 << i)) {
			list->allergens[index++] = (allergen_t) i;
		}
	}
}