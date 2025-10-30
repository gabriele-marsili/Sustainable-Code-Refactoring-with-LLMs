#include "dnd_character.h"
#include <time.h>
#include <stdlib.h>

int ability(void) 
{ 
    srand(time(NULL));
    int min = 7;
    int sum = 0;
    for(int i = 0; i < 4; ++i)
    {
        int die = rand() % (6) + 1;
        sum += die;
        min = MIN(min,sum);
    }
    return sum - min; 
}

int modifier(int score) 
{ 
    int a = (score - 10);
    return a / 2 - (a % 2 < 0);
}

dnd_character_t make_dnd_character(void) 
{ 
    dnd_character_t newChar;
    for(int i = 0; i < 6; ++i)
    {
        newChar.charisma = ability();
        newChar.constitution = ability();
        newChar.dexterity = ability();
        newChar.intelligence = ability();
        newChar.strength = ability();
        newChar.wisdom = ability();
        newChar.hitpoints = 10 + modifier(newChar.constitution);
    }
    return newChar; 
}
