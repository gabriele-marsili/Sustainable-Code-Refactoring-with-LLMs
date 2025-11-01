#include "dnd_character.h"
#include <time.h>
#include <stdlib.h>

static int rng_initialized = 0;

int ability(void) 
{ 
    if (!rng_initialized) {
        srand(time(NULL));
        rng_initialized = 1;
    }
    
    int dice[4];
    int min = 6;
    int sum = 0;
    
    for(int i = 0; i < 4; ++i)
    {
        dice[i] = rand() % 6 + 1;
        sum += dice[i];
        if (dice[i] < min) {
            min = dice[i];
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