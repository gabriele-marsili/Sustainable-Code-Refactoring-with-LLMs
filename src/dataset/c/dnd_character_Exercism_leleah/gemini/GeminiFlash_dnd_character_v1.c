#include "dnd_character.h"
#include <stdlib.h> // Required for qsort

dnd_character_t ret;

// Helper function to compare integers for qsort
int compare_integers(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int ability(void) {
    int rolls[4];
    int i;

    // Generate 4 random numbers between 1 and 6
    for (i = 0; i < 4; i++) {
        rolls[i] = (rand() % 6) + 1;
    }

    // Sort the rolls in ascending order
    qsort(rolls, 4, sizeof(int), compare_integers);

    // Sum the three highest rolls
    return rolls[1] + rolls[2] + rolls[3];
}

int modifier(int score) {
    return (score / 2) - 5;
}

dnd_character_t make_dnd_character(void) {
    // Seed the random number generator only once
    static int seeded = 0;
    if (!seeded) {
        srand(time(NULL));
        seeded = 1;
    }

    ret.strength = ability();
    ret.dexterity = ability();
    ret.constitution = ability();
    ret.intelligence = ability();
    ret.wisdom = ability();
    ret.charisma = ability();
    ret.hitpoints = 10 + modifier(ret.constitution);

    return ret;
}