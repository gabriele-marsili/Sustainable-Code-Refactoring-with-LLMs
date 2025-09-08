#include "beer_song.h"

void recite(uint8_t start_bottles, uint8_t take_down, char **song) {
    uint8_t bottles = start_bottles;
    uint32_t idx = 0;

    for (uint8_t i = 0; i < take_down; ++i) {
        if (bottles == 0) {
            idx += sprintf(song[idx],
                           "No more bottles of beer on the wall, no more bottles of beer.\n"
                           "Go to the store and buy some more, 99 bottles of beer on the wall.\n");
            bottles = 99;
        } else if (bottles == 1) {
            idx += sprintf(song[idx],
                           "1 bottle of beer on the wall, 1 bottle of beer.\n"
                           "Take it down and pass it around, no more bottles of beer on the wall.\n");
            bottles = 0;
        } else {
            idx += sprintf(song[idx],
                           "%u bottles of beer on the wall, %u bottles of beer.\n"
                           "Take one down and pass it around, %u bottle%s of beer on the wall.\n",
                           bottles, bottles, bottles - 1, (bottles - 1 == 1) ? "" : "s");
            --bottles;
        }
    }
}