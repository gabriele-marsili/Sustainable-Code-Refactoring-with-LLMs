#include "beer_song.h"
#include <stdio.h>
#include <string.h>

void recite(uint8_t start_bottles, uint8_t take_down, char **song) {
    uint8_t bottles = start_bottles;
    uint32_t idx = 0;

    for (uint8_t i = 0; i < take_down; ++i) {
        if (bottles == 0) {
            strcpy(song[idx], "No more bottles of beer on the wall, no more bottles of beer.");
            idx++;
            start_bottles = 99;
            sprintf(song[idx], "Go to the store and buy some more, %u bottles of beer on the wall.", start_bottles);
            idx++;
            bottles = start_bottles; 
        } else if (bottles == 1) {
            strcpy(song[idx], "1 bottle of beer on the wall, 1 bottle of beer.");
            idx++;
            strcpy(song[idx], "Take it down and pass it around, no more bottles of beer on the wall.");
            idx++;
            idx++;
            bottles = 0;
        } else {
            sprintf(song[idx], "%u bottles of beer on the wall, %u bottles of beer.", bottles, bottles);
            idx++;
            bottles--;
            if (bottles == 1) {
                strcpy(song[idx], "Take one down and pass it around, 1 bottle of beer on the wall.");
            } else {
                sprintf(song[idx], "Take one down and pass it around, %u bottles of beer on the wall.", bottles);
            }
            idx++;
            idx++;
        }
    }
}