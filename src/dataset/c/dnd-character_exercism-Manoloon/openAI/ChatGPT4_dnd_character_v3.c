#include "dnd_character.h"
#include <time.h>
#include <stdlib.h>

static int roll_die(void) {
    return rand() % 6 + 1;
}

int ability(void) 
{ 
    int rolls[4];
    int sum = 0, min = 7;

    for (int i = 0; i < 4; ++i) {
        rolls[i] = roll_die();
        sum += rolls[i];
        if (rolls[i] < min) {
            min = rolls[i];
        }
    }
    return sum - min; 
}

int modifier(int score) 
{ 
    return (score - 10) / 2;
}

dnd_character_t make_dnd_character(void) 
{ 
    static int seeded = 0;
    if (!seeded) {
        srand((unsigned int)time(NULL));
        seeded = 1;
    }

    dnd_character_t newChar;
    newChar.charisma = ability();
    newChar.constitution = ability();
    newChar.dexterity = ability();
    newChar.intelligence = ability();
    newChar.strength = ability();
    newChar.wisdom = ability();
    newChar.hitpoints = 10 + modifier(newChar.constitution);

    return newChar; 
}