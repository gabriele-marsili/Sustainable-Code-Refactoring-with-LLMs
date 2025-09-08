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

    char num_str[3];
    char next_num_str[3];

    const char *current_bottles = (count == 1) ? bottle : bottles;
    const char *next_bottles = (count == 2) ? bottle : bottles;

    const char *current_num = (count == 0) ? no_more : (sprintf(num_str, "%d", count), num_str);
    const char *next_num = (count == 0) ? no_more_n : (sprintf(next_num_str, "%d", count - 1), next_num_str);
    const char *action = (count == 0) ? go_to_store : ((count == 1) ? take_it : take_one);

    int len = 0;

    len += sprintf(buf + len, "%s%s%s, %s%s%s",
                   current_num, current_bottles, on_the_wall,
                   current_num, current_bottles, of_beer);

    sprintf(buf + len, "%s%s%s%s.\n",
            action, next_num, next_bottles, on_the_wall);
}

void sing(char *buf, int from, int to) {
    if (to > from) return;

    char verse_buf[256];
    int len = 0;

    for (int i = from; i >= to; --i) {
        verse(verse_buf, i);
        len += sprintf(buf + len, "%s", verse_buf);
        if (i > to) {
            buf[len++] = '\n';
        }
    }
    buf[len] = '\0';
}