#include "beer_song.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_SIZE   (1024)

static const char* const verse_templates[] = {
    "No more bottles of beer on the wall, no more bottles of beer.\n"
    "Go to the store and buy some more, 99 bottles of beer on the wall.\n",
    
    "1 bottle of beer on the wall, 1 bottle of beer.\n"
    "Take it down and pass it around, no more bottles of beer on the wall.\n",
    
    "2 bottles of beer on the wall, 2 bottles of beer.\n"
    "Take one down and pass it around, 1 bottle of beer on the wall.\n"
};

void verse(char *buff, int v) {
    if (v <= 2) {
        strcpy(buff, verse_templates[v]);
    } else {
        sprintf(buff, "%d bottles of beer on the wall, %d bottles of beer.\n"
            "Take one down and pass it around, %d bottles of beer on the wall.\n", 
            v, v, v-1);
    }
}

void sing(char *buff, int start, int stop) {
    char *current = buff;
    char verse_buff[BUFFER_SIZE];
    
    for(int v = start; v >= stop; v--) {
        verse(verse_buff, v);
        int verse_len = strlen(verse_buff);
        memcpy(current, verse_buff, verse_len);
        current += verse_len;
        if (v > stop) {
            *current++ = '\n';
        }
    }
    *current = '\0';
}