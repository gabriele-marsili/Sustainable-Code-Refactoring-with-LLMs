#include "beer_song.h"

void recite(uint8_t start_bottles, uint8_t take_down, char **song) {
    uint8_t bottles = start_bottles;
    uint32_t idx = 0;
    
    for (uint8_t verse = 0; verse < take_down; verse++) {
        if (bottles == 0) {
            strcpy(song[idx++], "No more bottles of beer on the wall, no more bottles of beer.");
            strcpy(song[idx++], "Go to the store and buy some more, 99 bottles of beer on the wall.");
            bottles = 99;
        } else if (bottles == 1) {
            strcpy(song[idx++], "1 bottle of beer on the wall, 1 bottle of beer.");
            strcpy(song[idx++], "Take it down and pass it around, no more bottles of beer on the wall.");
            bottles = 0;
            song[idx++] = "";
        } else if (bottles == 2) {
            sprintf(song[idx++], "%u bottles of beer on the wall, %u bottles of beer.", bottles, bottles);
            strcpy(song[idx++], "Take one down and pass it around, 1 bottle of beer on the wall.");
            bottles = 1;
            song[idx++] = "";
        } else {
            sprintf(song[idx++], "%u bottles of beer on the wall, %u bottles of beer.", bottles, bottles);
            sprintf(song[idx++], "Take one down and pass it around, %u bottles of beer on the wall.", --bottles);
            song[idx++] = "";
        }
    }
}