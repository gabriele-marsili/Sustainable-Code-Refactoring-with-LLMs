#include "dnd_character.h"
#include <algorithm>
#include <array>

int ability(void) {
    std::array<int, 4> rolls;
    for (int i = 0; i < 4; ++i) {
        rolls[i] = (rand() % 6) + 1;
    }
    std::sort(rolls.begin(), rolls.end());
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