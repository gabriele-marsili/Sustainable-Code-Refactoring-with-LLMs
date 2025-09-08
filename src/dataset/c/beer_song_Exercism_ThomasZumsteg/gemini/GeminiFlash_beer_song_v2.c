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
        snprintf(buff, BUFFER_SIZE, "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n", v, v, v-1);
    }
}

void sing(char *buff, int start, int stop) {
    char *current_pos = buff;
    for (int v = start; v >= stop; v--) {
        char verse_buff[BUFFER_SIZE];
        verse(verse_buff, v);
        size_t verse_len = strlen(verse_buff);
        memcpy(current_pos, verse_buff, verse_len);
        current_pos += verse_len;
        *current_pos = '\n';
        current_pos++;
    }
    if (current_pos > buff) {
        current_pos--;
    }
    *current_pos = '\0';
}