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

void mcat(int *pos, char *dst, const char *src_);

void verse(char *buf, int count)
{
    if (count > 99 || count < 0) {
        fprintf(stderr, "Invalid bottle count.\n");
        return;
    }

    char *ptr = buf;
    char num_str[4];
    
    if (count == 0) {
        strcpy(ptr, no_more);
        ptr += sizeof(no_more) - 1;
    } else {
        int len = sprintf(num_str, "%d", count);
        memcpy(ptr, num_str, len);
        ptr += len;
    }
    
    const char *bottle_word = (count == 1) ? bottle : bottles;
    strcpy(ptr, bottle_word);
    ptr += strlen(bottle_word);
    
    strcpy(ptr, on_the_wall);
    ptr += sizeof(on_the_wall) - 1;
    
    strcpy(ptr, ", ");
    ptr += 2;
    
    if (count == 0) {
        strcpy(ptr, no_more_n);
        ptr += sizeof(no_more_n) - 1;
    } else {
        memcpy(ptr, num_str, strlen(num_str));
        ptr += strlen(num_str);
    }
    
    strcpy(ptr, bottle_word);
    ptr += strlen(bottle_word);
    
    strcpy(ptr, of_beer);
    ptr += sizeof(of_beer) - 1;
    
    if (count == 0) {
        strcpy(ptr, go_to_store);
        ptr += sizeof(go_to_store) - 1;
    } else if (count == 1) {
        strcpy(ptr, take_it);
        ptr += sizeof(take_it) - 1;
    } else {
        strcpy(ptr, take_one);
        ptr += sizeof(take_one) - 1;
    }
    
    int next_count = (count == 0) ? 99 : count - 1;
    if (count == 1) {
        strcpy(ptr, no_more_n);
        ptr += sizeof(no_more_n) - 1;
    } else {
        int len = sprintf(num_str, "%d", next_count);
        memcpy(ptr, num_str, len);
        ptr += len;
    }
    
    bottle_word = (next_count == 1) ? bottle : bottles;
    strcpy(ptr, bottle_word);
    ptr += strlen(bottle_word);
    
    strcpy(ptr, on_the_wall);
    ptr += sizeof(on_the_wall) - 1;
    
    strcpy(ptr, ".\n");
    ptr += 2;
    
    *ptr = '\0';
}

void sing(char *buf, int from, int to)
{
    if (to > from)
        return;
        
    char *ptr = buf;
    char verse_buf[512];
    
    for (int i = from; i >= to; i--) {
        verse(verse_buf, i);
        size_t verse_len = strlen(verse_buf);
        memcpy(ptr, verse_buf, verse_len);
        ptr += verse_len;
        
        if (i > to) {
            *ptr++ = '\n';
        }
    }
    
    *ptr = '\0';
}

void mcat(int *pos, char *dst, const char *src_)
{
    const char *src = src_;
    char *tmp = dst + *pos;
    
    while (*src) {
        *tmp++ = *src++;
        (*pos)++;
    }
    
    *tmp = '\0';
}