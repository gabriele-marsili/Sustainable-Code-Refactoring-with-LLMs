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
	
	// First line
	if (count == 0) {
		strcpy(ptr, no_more);
		ptr += 7;
	} else {
		int len = sprintf(num_str, "%d", count);
		memcpy(ptr, num_str, len);
		ptr += len;
	}
	
	const char *bottle_word = (count == 1) ? bottle : bottles;
	strcpy(ptr, bottle_word);
	ptr += strlen(bottle_word);
	
	strcpy(ptr, on_the_wall);
	ptr += 20;
	
	strcpy(ptr, ", ");
	ptr += 2;
	
	if (count == 0) {
		strcpy(ptr, no_more_n);
		ptr += 7;
	} else {
		memcpy(ptr, num_str, strlen(num_str));
		ptr += strlen(num_str);
	}
	
	strcpy(ptr, bottle_word);
	ptr += strlen(bottle_word);
	
	strcpy(ptr, of_beer);
	ptr += 8;
	
	// Second line
	const char *action;
	if (count == 0) {
		action = go_to_store;
	} else if (count == 1) {
		action = take_it;
	} else {
		action = take_one;
	}
	strcpy(ptr, action);
	ptr += strlen(action);
	
	// Next count
	if (count == 1) {
		strcpy(ptr, no_more_n);
		ptr += 7;
	} else {
		int next_count = (count == 0) ? 99 : count - 1;
		int len = sprintf(num_str, "%d", next_count);
		memcpy(ptr, num_str, len);
		ptr += len;
	}
	
	const char *next_bottle_word = (count == 2) ? bottle : bottles;
	strcpy(ptr, next_bottle_word);
	ptr += strlen(next_bottle_word);
	
	strcpy(ptr, on_the_wall);
	ptr += 20;
	
	strcpy(ptr, ".\n");
	ptr += 2;
	
	*ptr = '\0';
}

void sing(char *buf, int from, int to)
{
	if (to > from)
		return;
		
	char *ptr = buf;
	char verse_buf[256];
	
	for (int i = from; i >= to + 1; i--) {
		verse(verse_buf, i);
		strcpy(ptr, verse_buf);
		ptr += strlen(verse_buf);
		*ptr++ = '\n';
	}
	
	verse(verse_buf, from >= to ? from : to);
	strcpy(ptr, verse_buf);
}

void mcat(int *pos, char *dst, const char *src_)
{
	const char *src = src_;
	char *tmp = dst + *pos;
	while ((*tmp = *src)) {
		tmp++;
		src++;
		(*pos)++;
	}
}