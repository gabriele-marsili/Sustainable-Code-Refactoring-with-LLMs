#include "dnd_character.h"

#include <math.h>

void swap(int *a, int *b);

void swap(int *a, int *b) {
    int aux = *a;
    *a = *b;
    *b = aux;
}

int ability(void) {
    int dice_array[4];
    int lesser = INT_MAX, lesser_idx = -1;

    for (int dice_idx = 0; dice_idx < 4; dice_idx++) {
        dice_array[dice_idx] = (rand() % 6 + 1);
        if (dice_array[dice_idx] < lesser) {
            lesser = dice_array[dice_idx];
            lesser_idx = dice_idx;
        }
    }
    swap(&dice_array[lesser_idx], &dice_array[3]);
    return (dice_array[0] + dice_array[1] + dice_array[2]);
}

int modifier(int score) { return floor((score - 10) / 2.0); }

dnd_character_t make_dnd_character(void) {
    srand(time(NULL));
    dnd_character_t new_character;
    new_character.strength = ability();
    new_character.dexterity = ability();
    new_character.constitution = ability();
    new_character.intelligence = ability();
    new_character.wisdom = ability();
    new_character.charisma = ability();
    new_character.hitpoints = 10 + modifier(new_character.constitution);
    return (new_character);
}
