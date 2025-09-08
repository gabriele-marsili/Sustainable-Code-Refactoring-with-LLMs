#include "beer_song.h"
#include <stdio.h>
#include <string.h>

static const char bottle[] = " bottle";
static const char bottles[] = " bottles";
static const char on_the_wall[] = " of beer on the wall";
static const char of_beer[] = " of beer.\n";
static const char take_one[] = "Take one down and pass it around, ";
static const char take_it[] = "Take it down and pass it around, ";
static const char no_more[] = "No more";
static const char no_more_n[] = "no more";
static const char go_to_store[] = "Go to the store and buy some more, ";

void verse(char *buf, int count) {
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    char num_str[3];
    char next_num_str[3];

    const char *current_bottles = (count == 1) ? bottle : bottles;
    const char *next_bottles = (count == 2) ? bottle : bottles;

    const char *first_num = (count == 0) ? no_more : (sprintf(num_str, "%d", count), num_str);
    const char *second_num = (count == 0) ? no_more_n : (sprintf(num_str, "%d", count), num_str);
    const char *next_num = (count == 0) ? (sprintf(next_num_str, "99"), next_num_str) : (sprintf(next_num_str, "%d", count - 1), next_num_str);

    const char *action = (count == 0) ? go_to_store : ((count == 1) ? take_it : take_one);

    int len = 0;

    len += sprintf(buf + len, "%s%s%s, %s%s%s",
                   first_num, current_bottles, on_the_wall,
                   second_num, current_bottles, of_beer);

    sprintf(buf + len, "%s%s%s%s.\n",
            action, next_num, next_bottles, on_the_wall);
}


void sing(char *buf, int from, int to) {
    if (to > from) return;

    char verse_buf[256];
    size_t total_len = 0;

    for (int i = from; i >= to; --i) {
        verse(verse_buf, i);
        size_t verse_len = strlen(verse_buf);

        memcpy(buf + total_len, verse_buf, verse_len);
        total_len += verse_len;

        if (i > to) {
            memcpy(buf + total_len, "\n", 1);
            total_len += 1;
        }
    }
    buf[total_len] = '\0';
}