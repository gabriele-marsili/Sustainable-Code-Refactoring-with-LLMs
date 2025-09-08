#include "beer_song.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_SIZE   (1024)

void verse(char *buff, int v) {
    if (v == 0) {
        strcpy(buff, "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n");
    } else if (v == 1) {
        strcpy(buff, "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n");
    } else if (v == 2) {
        strcpy(buff, "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n");
    } else {
        sprintf(buff, "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n", v, v, v-1);
    }
}

void sing(char *buff, int start, int stop) {
    char verse_buff[BUFFER_SIZE];
    buff[0] = '\0';
    for (int v = start; v >= stop; v--) {
        verse(verse_buff, v);
        size_t current_len = strlen(buff);
        size_t verse_len = strlen(verse_buff);

        if (current_len + verse_len + 1 < BUFFER_SIZE) {
            strcpy(buff + current_len, verse_buff);
            strcat(buff, "\n");
        } else {
            // Handle overflow condition, possibly truncate or return an error
            buff[current_len] = '\0'; // Ensure null termination
            return; // Or set an error code and return
        }
    }
    if (strlen(buff) > 0) {
        buff[strlen(buff) - 1] = '\0';
    }
}