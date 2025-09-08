#include "beer_song.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_SIZE   (1024)

void verse(char *buff, int v) {
    if (v == 0) {
        snprintf(buff, BUFFER_SIZE, 
            "No more bottles of beer on the wall, "
            "no more bottles of beer.\n"
            "Go to the store and buy some more, "
            "99 bottles of beer on the wall.\n");
    } else if (v == 1) {
        snprintf(buff, BUFFER_SIZE, 
            "1 bottle of beer on the wall, "
            "1 bottle of beer.\n" 
            "Take it down and pass it around, "
            "no more bottles of beer on the wall.\n");
    } else if (v == 2) {
        snprintf(buff, BUFFER_SIZE, 
            "2 bottles of beer on the wall, "
            "2 bottles of beer.\n" 
            "Take one down and pass it around, "
            "1 bottle of beer on the wall.\n");
    } else {
        snprintf(buff, BUFFER_SIZE, 
            "%d bottles of beer on the wall, %d bottles of beer.\n" 
            "Take one down and pass it around, "
            "%d bottles of beer on the wall.\n", v, v, v - 1);
    }
}

void sing(char *buff, int start, int stop) {
    char *ptr = buff;
    for (int v = start; v >= stop; v--) {
        char verse_buff[BUFFER_SIZE];
        verse(verse_buff, v);
        size_t len = strlen(verse_buff);
        memcpy(ptr, verse_buff, len);
        ptr += len;
        if (v > stop) {
            *ptr++ = '\n';
        }
    }
    *ptr = '\0';
}