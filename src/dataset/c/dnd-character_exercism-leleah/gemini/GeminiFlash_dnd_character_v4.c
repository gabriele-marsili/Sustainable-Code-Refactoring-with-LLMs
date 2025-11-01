#include "dnd_character.h"
#include <stdlib.h>
#include <time.h>

int ability(void) {
    int rolls[4];
    int min_roll = 6;
    int sum = 0;

    // Seed the random number generator only once per program execution, not per ability call
    // static int seeded = 0;
    // if (!seeded) {
    //     srand(time(NULL));
    //     seeded = 1;
    // }

    for (int i = 0; i < 4; ++i) {
        rolls[i] = (rand() % 6) + 1;
        if (rolls[i] < min_roll) {
            min_roll = rolls[i];
        }
    }

    for (int i = 0; i < 4; ++i) {
        sum += rolls[i];
    }

    sum -= min_roll; // Subtract the lowest roll

    return sum;
}

int modifier(int score) {
    return (score / 2) - 5;
}

dnd_character_t make_dnd_character(void) {
    dnd_character_t character;

    // Seed the random number generator only once per program execution
    srand(time(NULL));

    character.strength = ability();
    character.dexterity = ability();
    character.constitution = ability();
    character.intelligence = ability();
    character.wisdom = ability();
    character.charisma = ability();
    character.hitpoints = 10 + modifier(character.constitution);

    return character;
}