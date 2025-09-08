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

static inline void append(char **dst, const char *src) {
    while (*src) *(*dst)++ = *src++;
}

void verse(char *buf, int count) {
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    char *pos = buf;
    const char *bot_bef = count == 0 ? no_more : "";
    const char *bot_aft = count == 0 ? 99 : count - 1;

    append(&pos, count == 0 ? no_more : bot_bef);
    append(&pos, count == 1 ? bottle : bottles);
    append(&pos, on_the_wall);
    append(&pos, ", ");
    append(&pos, count == 0 ? no_more_n : bot_bef);
    append(&pos, count == 1 ? bottle : bottles);
    append(&pos, of_beer);
    append(&pos, count == 0 ? go_to_store : count == 1 ? take_it : take_one);
    append(&pos, count == 1 ? no_more_n : bot_aft);
    append(&pos, count == 2 ? bottle : bottles);
    append(&pos, on_the_wall);
    append(&pos, ".\n");
    *pos = '\0';
}

void sing(char *buf, int from, int to) {
    if (to > from) return;

    char *pos = buf;
    char l_buf[1024];
    for (; from >= to; from--) {
        verse(l_buf, from);
        append(&pos, l_buf);
        if (from != to) append(&pos, "\n");
    }
    *pos = '\0';
}