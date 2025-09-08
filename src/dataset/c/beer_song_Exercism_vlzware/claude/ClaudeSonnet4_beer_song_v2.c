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

static inline void fast_strcpy(char *dst, const char *src) {
    while ((*dst++ = *src++));
}

static inline int int_to_str(char *buf, int num) {
    if (num == 0) {
        *buf++ = '0';
        *buf = '\0';
        return 1;
    }
    
    char temp[4];
    int len = 0;
    while (num > 0) {
        temp[len++] = '0' + (num % 10);
        num /= 10;
    }
    
    for (int i = len - 1; i >= 0; i--) {
        *buf++ = temp[i];
    }
    *buf = '\0';
    return len;
}

void verse(char *buf, int count)
{
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    char *pos = buf;
    char num_buf[4];
    
    // First line
    if (count == 0) {
        fast_strcpy(pos, no_more);
        pos += sizeof(no_more) - 1;
    } else {
        int len = int_to_str(num_buf, count);
        fast_strcpy(pos, num_buf);
        pos += len;
    }
    
    fast_strcpy(pos, (count == 1) ? bottle : bottles);
    pos += (count == 1) ? sizeof(bottle) - 1 : sizeof(bottles) - 1;
    
    fast_strcpy(pos, on_the_wall);
    pos += sizeof(on_the_wall) - 1;
    
    *pos++ = ',';
    *pos++ = ' ';
    
    if (count == 0) {
        fast_strcpy(pos, no_more_n);
        pos += sizeof(no_more_n) - 1;
    } else {
        fast_strcpy(pos, num_buf);
        pos += strlen(num_buf);
    }
    
    fast_strcpy(pos, (count == 1) ? bottle : bottles);
    pos += (count == 1) ? sizeof(bottle) - 1 : sizeof(bottles) - 1;
    
    fast_strcpy(pos, of_beer);
    pos += sizeof(of_beer) - 1;
    
    // Second line
    if (count == 0) {
        fast_strcpy(pos, go_to_store);
        pos += sizeof(go_to_store) - 1;
        fast_strcpy(pos, "99");
        pos += 2;
    } else {
        fast_strcpy(pos, (count == 1) ? take_it : take_one);
        pos += (count == 1) ? sizeof(take_it) - 1 : sizeof(take_one) - 1;
        
        if (count == 1) {
            fast_strcpy(pos, no_more_n);
            pos += sizeof(no_more_n) - 1;
        } else {
            int next_count = count - 1;
            int len = int_to_str(num_buf, next_count);
            fast_strcpy(pos, num_buf);
            pos += len;
        }
    }
    
    fast_strcpy(pos, (count == 2) ? bottle : bottles);
    pos += (count == 2) ? sizeof(bottle) - 1 : sizeof(bottles) - 1;
    
    fast_strcpy(pos, on_the_wall);
    pos += sizeof(on_the_wall) - 1;
    
    *pos++ = '.';
    *pos++ = '\n';
    *pos = '\0';
}

void sing(char *buf, int from, int to)
{
    if (to > from)
        return;
        
    char *pos = buf;
    char verse_buf[256];
    
    for (int i = from; i > to; i--) {
        verse(verse_buf, i);
        fast_strcpy(pos, verse_buf);
        pos += strlen(verse_buf);
        *pos++ = '\n';
    }
    
    verse(verse_buf, to);
    fast_strcpy(pos, verse_buf);
}