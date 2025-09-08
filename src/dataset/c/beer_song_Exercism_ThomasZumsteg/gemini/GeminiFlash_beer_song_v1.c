#include "beer_song.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

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
    char verse_buff[BUFFER_SIZE];
    size_t current_length = 0;

    for (int v = start; v >= stop; v--) {
        verse(verse_buff, v);
        size_t verse_length = strlen(verse_buff);

        // Check if adding the verse and newline exceeds the buffer size
        if (current_length + verse_length + 1 >= BUFFER_SIZE) {
            // Handle overflow (e.g., truncate, return an error, etc.)
            // For this example, we'll truncate.  A real implementation
            // should probably return an error.
            verse_length = BUFFER_SIZE - current_length - 1;
            strncpy(buff + current_length, verse_buff, verse_length);
            buff[BUFFER_SIZE - 1] = '\0';
            return;
        }

        strcpy(buff + current_length, verse_buff);
        current_length += verse_length;

        buff[current_length++] = '\n';
        buff[current_length] = '\0';
    }

    if (current_length > 0) {
        buff[current_length - 1] = '\0';
    }
}