#include "dnd_character.h"
#include <algorithm>
#include <vector>

int ability(void) {
    std::vector<int> rolls(4);
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
    dnd_character_t ret;
    
    // Seed only once at the start of the program, not for every ability score
    static bool seeded = false;
    if (!seeded) {
        srand(time(NULL));
        seeded = true;
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