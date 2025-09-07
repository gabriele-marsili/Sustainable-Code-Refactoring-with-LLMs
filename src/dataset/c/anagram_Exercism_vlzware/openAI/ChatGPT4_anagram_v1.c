#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

/* Convert to lowercase and calculate length */
int mstrlen_cp(char* w, char *ref)
{
	int res = 0;
	while (*w) {
		char lower = tolower(*w);
		*ref++ = lower;
		*w++ = lower;
		res++;
	}
	*ref = '\0';
	return res;
}

/* Convert to lowercase and compare to ref */
int mstrlen_ref(char* w, char *ref)
{
	int res = 0, same = 1;
	while (*w) {
		char lower = tolower(*w);
		if (same && *ref && (lower != *ref++)) {
			same = 0;
		}
		*w++ = lower;
		res++;
	}
	return same ? -1 : res;
}

/* qsort comparing function for char's */
int qsortcmp(const void *a, const void *b)
{
	return (*(const char *)a - *(const char *)b);
}

void anagrams_for(const char *word, struct candidates *candidates)
{
	if (!word || !candidates) return;

	char sorted_word[MAX_STR_LEN];
	int wlen = mstrlen_cp((char*)word, sorted_word);
	qsort(sorted_word, wlen, sizeof(char), qsortcmp);

	for (int i = 0; i < (int)candidates->count; i++) {
		struct candidate *tmp = &(candidates->candidate[i]);
		char sorted_candidate[MAX_STR_LEN];
		int llen = mstrlen_cp(tmp->candidate, sorted_candidate);

		if (llen != wlen) {
			tmp->is_anagram = NOT_ANAGRAM;
			continue;
		}

		qsort(sorted_candidate, llen, sizeof(char), qsortcmp);
		tmp->is_anagram = (memcmp(sorted_word, sorted_candidate, wlen) == 0) ? IS_ANAGRAM : NOT_ANAGRAM;
	}
}