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
		memcpy(ptr, no_more, 7);
		ptr += 7;
	} else {
		int len = sprintf(num_str, "%i", count);
		memcpy(ptr, num_str, len);
		ptr += len;
	}
	
	if (count == 1) {
		memcpy(ptr, bottle, 7);
		ptr += 7;
	} else {
		memcpy(ptr, bottles, 8);
		ptr += 8;
	}
	
	memcpy(ptr, on_the_wall, 20);
	ptr += 20;
	
	*ptr++ = ',';
	*ptr++ = ' ';
	
	if (count == 0) {
		memcpy(ptr, no_more_n, 7);
		ptr += 7;
	} else {
		int len = sprintf(num_str, "%i", count);
		memcpy(ptr, num_str, len);
		ptr += len;
	}
	
	if (count == 1) {
		memcpy(ptr, bottle, 7);
		ptr += 7;
	} else {
		memcpy(ptr, bottles, 8);
		ptr += 8;
	}
	
	memcpy(ptr, of_beer, 9);
	ptr += 9;
	
	if (count == 0) {
		memcpy(ptr, go_to_store, 34);
		ptr += 34;
		memcpy(ptr, "99", 2);
		ptr += 2;
	} else if (count == 1) {
		memcpy(ptr, take_it, 32);
		ptr += 32;
		memcpy(ptr, no_more_n, 7);
		ptr += 7;
	} else {
		memcpy(ptr, take_one, 35);
		ptr += 35;
		int len = sprintf(num_str, "%i", count - 1);
		memcpy(ptr, num_str, len);
		ptr += len;
	}
	
	if (count == 2) {
		memcpy(ptr, bottle, 7);
		ptr += 7;
	} else {
		memcpy(ptr, bottles, 8);
		ptr += 8;
	}
	
	memcpy(ptr, on_the_wall, 20);
	ptr += 20;
	
	*ptr++ = '.';
	*ptr++ = '\n';
	*ptr = '\0';
}

void sing(char *buf, int from, int to)
{
	if (to > from)
		return;
		
	char *ptr = buf;
	char verse_buf[256];
	
	while (from > to) {
		verse(verse_buf, from);
		int len = strlen(verse_buf);
		memcpy(ptr, verse_buf, len);
		ptr += len;
		*ptr++ = '\n';
		from--;
	}
	
	verse(verse_buf, from);
	int len = strlen(verse_buf);
	memcpy(ptr, verse_buf, len);
	ptr += len;
	*ptr = '\0';
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