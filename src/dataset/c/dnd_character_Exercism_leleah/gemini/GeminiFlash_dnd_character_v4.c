#include "dnd_character.h"
#include <algorithm>
#include <array>
#include <numeric>

int ability(void) {
    std::array<int, 4> rolls;
    for (int i = 0; i < 4; ++i) {
        rolls[i] = (rand() % 6) + 1;
    }
    
    int min_val = rolls[0];
    int min_index = 0;
    for (int i = 1; i < 4; ++i) {
        if (rolls[i] < min_val) {
            min_val = rolls[i];
            min_index = i;
        }
    }

    int sum = 0;
    for (int i = 0; i < 4; ++i) {
        if (i != min_index) {
            sum += rolls[i];
        }
    }
    return sum;
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