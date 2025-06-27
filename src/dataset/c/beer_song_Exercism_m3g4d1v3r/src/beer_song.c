#include "beer_song.h"

void recite(uint8_t start_bottles, uint8_t take_down, char **song) {
    uint8_t bottles = start_bottles;
    uint32_t idx = 0, take_down_idx = 0;

    while (take_down_idx++ < take_down) {
        if (bottles == 0) {
            sprintf(song[idx++],
                    "No more bottles of beer on the wall, no more bottles of "
                    "beer.");
            start_bottles = 99;
            sprintf(song[idx++],
                    "Go to the store and buy some more, %u bottles of beer on "
                    "the wall.",
                    start_bottles);
        } else if (bottles == 1) {
            sprintf(song[idx++],
                    "1 bottle of beer on the wall, 1 bottle of beer.");
            --bottles;
            sprintf(song[idx++],
                    "Take it down and pass it around, no more bottles of beer "
                    "on the wall.");
            idx++;    // ""
        } else {
            sprintf(song[idx++],
                    "%u bottles of beer on the wall, %u bottles of beer.",
                    bottles, bottles);
            if (--bottles != 1) {
                sprintf(
                    song[idx++],
                    "Take one down and pass it around, %u bottles of beer on "
                    "the wall.",
                    bottles);
            } else {
                sprintf(song[idx++],
                        "Take one down and pass it around, 1 bottle of beer on "
                        "the wall.");
            }
            idx++;    // ""
        }
    }
}
