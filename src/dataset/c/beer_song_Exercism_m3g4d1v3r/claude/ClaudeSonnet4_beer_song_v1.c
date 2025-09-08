#include "beer_song.h"

void recite(uint8_t start_bottles, uint8_t take_down, char **song) {
    uint8_t bottles = start_bottles;
    uint32_t idx = 0, take_down_idx = 0;
    
    // Pre-computed format strings to avoid repeated string literals
    static const char* const no_more_wall = "No more bottles of beer on the wall, no more bottles of beer.";
    static const char* const go_store = "Go to the store and buy some more, 99 bottles of beer on the wall.";
    static const char* const one_wall = "1 bottle of beer on the wall, 1 bottle of beer.";
    static const char* const take_it_down = "Take it down and pass it around, no more bottles of beer on the wall.";
    static const char* const take_one_down_plural = "Take one down and pass it around, %u bottles of beer on the wall.";
    static const char* const take_one_down_singular = "Take one down and pass it around, 1 bottle of beer on the wall.";

    while (take_down_idx++ < take_down) {
        if (bottles == 0) {
            strcpy(song[idx++], no_more_wall);
            strcpy(song[idx++], go_store);
            bottles = 99;
        } else if (bottles == 1) {
            strcpy(song[idx++], one_wall);
            --bottles;
            strcpy(song[idx++], take_it_down);
            song[idx++][0] = '\0';  // Empty string
        } else {
            sprintf(song[idx++], "%u bottles of beer on the wall, %u bottles of beer.", bottles, bottles);
            --bottles;
            if (bottles != 1) {
                sprintf(song[idx++], take_one_down_plural, bottles);
            } else {
                strcpy(song[idx++], take_one_down_singular);
            }
            song[idx++][0] = '\0';  // Empty string
        }
    }
}