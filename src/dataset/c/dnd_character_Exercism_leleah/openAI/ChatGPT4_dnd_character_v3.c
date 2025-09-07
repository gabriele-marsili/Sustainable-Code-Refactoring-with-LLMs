#include "dnd_character.h"
#include <stdlib.h>
#include <time.h>

dnd_character_t ret;

int ability(void) {
    srand(time(NULL));
    int rolls[4];
    for (int i = 0; i < 4; i++) {
        rolls[i] = (rand() % 6) + 1;
    }

    int min = rolls[0], sum = 0;
    for (int i = 0; i < 4; i++) {
        if (rolls[i] < min) {
            min = rolls[i];
        }
        sum += rolls[i];
    }

    return sum - min;
}

int modifier(int score) {
    return (score / 2) - 5;
}

dnd_character_t make_dnd_character(void) {
    ret.strength = ability();
    ret.dexterity = ability();
    ret.constitution = ability();
    ret.intelligence = ability();
    ret.wisdom = ability();
    ret.charisma = ability();
    ret.hitpoints = 10 + modifier(ret.constitution);

    return ret;
}