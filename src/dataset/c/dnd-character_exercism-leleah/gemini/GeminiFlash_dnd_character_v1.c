#include "dnd_character.h"
#include <stdlib.h>
#include <time.h>

dnd_character_t make_dnd_character(void);

static int roll_ability(void);
static int calculate_modifier(int score);

static int roll_ability(void) {
    int rolls[4];
    int min_index = 0;
    int sum = 0;

    for (int i = 0; i < 4; ++i) {
        rolls[i] = (rand() % 6) + 1;
        if (rolls[i] < rolls[min_index]) {
            min_index = i;
        }
    }

    for (int i = 0; i < 4; ++i) {
        if (i != min_index) {
            sum += rolls[i];
        }
    }

    return sum;
}

static int calculate_modifier(int score) {
    return (score / 2) - 5;
}

dnd_character_t make_dnd_character(void) {
    dnd_character_t character;

    // Initialize random seed only once
    static int seeded = 0;
    if (!seeded) {
        srand(time(NULL));
        seeded = 1;
    }

    character.strength = roll_ability();
    character.dexterity = roll_ability();
    character.constitution = roll_ability();
    character.intelligence = roll_ability();
    character.wisdom = roll_ability();
    character.charisma = roll_ability();
    character.hitpoints = 10 + calculate_modifier(character.constitution);

    return character;
}