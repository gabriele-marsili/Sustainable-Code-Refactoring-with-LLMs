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

void mcat(int *pos, char *dst, const char *src);

void verse(char *buf, int count)
{
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    int pos = 0;
    char bot_bef[4]; // Reduced size to handle up to 3 digits + null terminator
    char bot_aft[4];

    const char *bot_bef_str = (count == 0) ? no_more : (sprintf(bot_bef, "%d", count), bot_bef);
    const char *bot_aft_str = (count == 0) ? "99" : (sprintf(bot_aft, "%d", count - 1), bot_aft);

    mcat(&pos, buf, bot_bef_str);
    mcat(&pos, buf, (count == 1) ? bottle : bottles);
    mcat(&pos, buf, on_the_wall);
    mcat(&pos, buf, ", ");
    mcat(&pos, buf, (count == 0) ? no_more_n : bot_bef_str);
    mcat(&pos, buf, (count == 1) ? bottle : bottles);
    mcat(&pos, buf, of_beer);
    mcat(&pos, buf, (count == 0) ? go_to_store : (count == 1) ? take_it : take_one);
    mcat(&pos, buf, (count == 1) ? no_more_n : bot_aft_str);
    mcat(&pos, buf, (count == 2) ? bottle : bottles);
    mcat(&pos, buf, on_the_wall);
    mcat(&pos, buf, ".\n");
}

void sing(char *buf, int from, int to)
{
    if (to > from)
        return;

    int pos = 0;
    for (int i = from; i >= to; i--) {
        char l_buf[256]; // Reduced buffer size to handle a single verse
        verse(l_buf, i);
        mcat(&pos, buf, l_buf);
        if (i != to) {
            mcat(&pos, buf, "\n");
        }
    }
}

/**
 * mcat: concatenate strings, puts the new length in pos,
 * assumes dst is big enough
 */
void mcat(int *pos, char *dst, const char *src)
{
    while (*src) {
        dst[(*pos)++] = *src++;
    }
    dst[*pos] = '\0';
}