#include "dnd_character.h"
#include <stdlib.h>
#include <time.h>

int ability(void) {
    int rolls[4];
    int min = 7;
    int sum = 0;

    for (int i = 0; i < 4; ++i) {
        rolls[i] = rand() % 6 + 1;
        sum += rolls[i];
        if (rolls[i] < min) {
            min = rolls[i];
        }
    }
    return sum - min;
}

int modifier(int score) {
    return (score - 10) / 2;
}

dnd_character_t make_dnd_character(void) {
    dnd_character_t newChar;
    
    // Seed only once
    static int seeded = 0;
    if (!seeded) {
        srand(time(NULL));
        seeded = 1;
    }

    newChar.strength = ability();
    newChar.dexterity = ability();
    newChar.constitution = ability();
    newChar.intelligence = ability();
    newChar.wisdom = ability();
    newChar.charisma = ability();
    newChar.hitpoints = 10 + modifier(newChar.constitution);

    return newChar;
}