#include "dnd_character.h"
#include <stdlib.h> // Required for qsort

int compare_ints(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int ability(void) {
    int rolls[4];
    
    // Seed only once at the program start, not for every ability roll.
    // srand(time(NULL)); // Remove this line

    for (int i = 0; i < 4; i++) {
        rolls[i] = (rand() % 6) + 1;
    }

    qsort(rolls, 4, sizeof(int), compare_ints);

    return rolls[1] + rolls[2] + rolls[3];
}

int modifier(int score) {
    return (score / 2) - 5;
}

dnd_character_t make_dnd_character(void) {
    dnd_character_t character;

    character.strength = ability();
    character.dexterity = ability();
    character.constitution = ability();
    character.intelligence = ability();
    character.wisdom = ability();
    character.charisma = ability();
    character.hitpoints = 10 + modifier(character.constitution);

    return character;
}