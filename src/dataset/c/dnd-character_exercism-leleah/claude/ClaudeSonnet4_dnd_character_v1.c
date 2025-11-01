#include "dnd_character.h"

int ability(void)
{
    static int seeded = 0;
    if (!seeded) {
        srand(time(NULL));
        seeded = 1;
    }
    
    int dice[4];
    dice[0] = (rand() % 6) + 1;
    dice[1] = (rand() % 6) + 1;
    dice[2] = (rand() % 6) + 1;
    dice[3] = (rand() % 6) + 1;
    
    int min = dice[0];
    int sum = dice[0];
    
    for (int i = 1; i < 4; i++) {
        if (dice[i] < min) {
            min = dice[i];
        }
        sum += dice[i];
    }
    
    return sum - min;
}

int modifier(int score)
{
    return (score >> 1) - 5;
}

dnd_character_t make_dnd_character(void)
{
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