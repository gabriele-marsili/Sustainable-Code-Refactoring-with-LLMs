#include "dnd_character.h"
#include <time.h>
#include <stdlib.h>

int ability(void) 
{ 
    int rolls[4];
    int min = 7;
    int sum = 0;
    for(int i = 0; i < 4; ++i)
    {
        rolls[i] = rand() % 6 + 1;
        sum += rolls[i];
        if (rolls[i] < min)
        {
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
    dnd_character_t newChar;
    
    // Generate all abilities first
    int charisma = ability();
    int constitution = ability();
    int dexterity = ability();
    int intelligence = ability();
    int strength = ability();
    int wisdom = ability();

    newChar.charisma = charisma;
    newChar.constitution = constitution;
    newChar.dexterity = dexterity;
    newChar.intelligence = intelligence;
    newChar.strength = strength;
    newChar.wisdom = wisdom;
    newChar.hitpoints = 10 + modifier(newChar.constitution);
    
    return newChar; 
}