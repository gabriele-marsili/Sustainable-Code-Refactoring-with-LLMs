#include "beer_song.h"
#include <stdio.h>
#include <string.h>

const char *bottle = " bottle";
const char *bottles = " bottles";
const char *on_the_wall = " of beer on the wall";
const char *of_beer = " of beer.\n";
const char *take_one = "Take one down and pass it around, ";
const char *take_it = "Take it down and pass it around, ";
const char *no_more = "No more";
const char *no_more_n = "no more";
const char *go_to_store = "Go to the store and buy some more, ";

void verse(char *buf, int count) {
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    char bot_bef[3];
    char bot_aft[3];

    if (count == 0) {
        strcpy(bot_bef, no_more);
    } else {
        snprintf(bot_bef, sizeof(bot_bef), "%d", count);
    }

    snprintf(bot_aft, sizeof(bot_aft), "%d", (count == 0) ? 99 : count - 1);

    char *ptr = buf;

    ptr += sprintf(ptr, "%s%s%s, %s%s%s",
                   (count == 0) ? no_more : bot_bef,
                   (count == 1) ? bottle : bottles,
                   on_the_wall,
                   (count == 0) ? no_more_n : bot_bef,
                   (count == 1) ? bottle : bottles,
                   of_beer);

    ptr += sprintf(ptr, "%s%s%s%s.\n",
                   (count == 0) ? go_to_store : ((count == 1) ? take_it : take_one),
                   (count == 1) ? no_more_n : bot_aft,
                   (count == 2) ? bottle : bottles,
                   on_the_wall);
}

void sing(char *buf, int from, int to) {
    if (to > from) {
        return;
    }

    char *ptr = buf;
    char verse_buf[256];

    for (int i = from; i >= to; --i) {
        verse(verse_buf, i);
        ptr += sprintf(ptr, "%s", verse_buf);
        if (i != to) {
            ptr += sprintf(ptr, "\n");
        }
    }
}