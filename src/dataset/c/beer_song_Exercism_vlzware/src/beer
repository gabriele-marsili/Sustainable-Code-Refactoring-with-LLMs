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

void mcat(int *pos, char *dst, const char *src_);

void verse(char *buf, int count)
{
	if (count > 99 || count < 0) {
		fprintf(stderr, "Invalid bottle count.\n");
		return;
	}

	int pos = 0;
	const char *bot_bef = (count == 0) ? no_more : "";
	const char *bot_aft = (count == 0) ? 99 : count-1;

	mcat(&pos, buf, count == 0? no_more : bot_bef);
	mcat(&pos, buf, count == 1? bottle : bottles);
	mcat(&pos, buf, on_the_wall);
	mcat(&pos, buf, ", ");
	mcat(&pos, buf, count == 0? no_more_n : bot_bef);
	mcat(&pos, buf, count == 1? bottle : bottles);
	mcat(&pos, buf, of_beer);
	mcat(&pos, buf, count == 0? go_to_store :
		count == 1? take_it : take_one);
	mcat(&pos, buf, count == 1? no_more_n : bot_aft);
	mcat(&pos, buf, count == 2? bottle : bottles);
	mcat(&pos, buf, on_the_wall);
	mcat(&pos, buf, ".\n");
}

void sing(char *buf, int from, int to)
{
	if (to > from)
		return;
	int pos = 0;
	char l_buf[1024];
	for (; from >= to; from--) {
		verse(l_buf, from);
		mcat(&pos, buf, l_buf);
		if (from != to) mcat(&pos, buf, "\n");
	}
}

/**
 * mcat: concatenate strings, puts the new length in pos,
 * assumes dst is big enough
 */
void mcat(int *pos, char *dst, const char *src_)
{
	while (*src_) {
		dst[(*pos)++] = *src_++;
	}
	dst[*pos] = '\0';
}