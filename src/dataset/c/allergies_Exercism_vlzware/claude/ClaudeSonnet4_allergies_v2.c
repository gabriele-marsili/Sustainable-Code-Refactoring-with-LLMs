#include "allergies.h"
#include <stdlib.h>

bool is_allergic_to(allergen_t allergen, int score)
{
	return (score > 0) && (score & (1 << allergen));
}

void get_allergens(int score, allergen_list_t *list)
{
	if (score <= 0) {
		list->count = 0;
		list->allergens = NULL;
		return;
	}

	// Count set bits first
	int temp_score = score;
	int count = 0;
	while (temp_score && count < ALLERGEN_COUNT) {
		if (temp_score & 1) count++;
		temp_score >>= 1;
	}

	list->count = count;
	if (count == 0) {
		list->allergens = NULL;
		return;
	}

	list->allergens = (allergen_t *) malloc(count * sizeof(allergen_t));
	if (list->allergens == NULL) {
		list->count = 0;
		return;
	}

	int index = 0;
	for (int i = 0; i < ALLERGEN_COUNT && index < count; i++) {
		if (score & (1 << i)) {
			list->allergens[index++] = (allergen_t) i;
		}
	}
}