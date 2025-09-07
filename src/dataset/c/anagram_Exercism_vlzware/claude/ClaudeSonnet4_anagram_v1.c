/**
 * Check for anagrams:
 *
 * O(n) time complexity using character frequency counting
 * More energy efficient than sorting approach
 *
 * Uses character frequency arrays for comparison
 * Works with ASCII characters (can be extended for Unicode)
 */

#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

#define CHAR_COUNT 256

/* get length and convert to lowercase, copy w to ref */
int mstrlen_cp(char* w, char *ref)
{
	int res = 0;
	while (*w) {
		*w = tolower(*w);
		*ref++ = *w;
		res++;
		w++;
	}
	*ref = '\0';

	return res;
}

/* get length and convert to lowercase, compare to ref */
int mstrlen_ref(char* w, char *ref)
{
	int res = 0;
	int same = 0;
	while (*w) {
		*w = tolower(*w);
		if (ref && *ref && (*w == *ref)) {
			same++;
			ref++;
		}
		res++;
		w++;
	}
	if (res == same)
		return -1;

	return res;
}

/* qsort comparing function for char's */
int qsortcmp(const void *a, const void *b)
{
	const char *p = (const char *) a;
	const char *q = (const char *) b;

	return (*p - *q);
}

/* Create character frequency array */
static void create_freq_array(const char* str, int len, int* freq)
{
	memset(freq, 0, CHAR_COUNT * sizeof(int));
	for (int i = 0; i < len; i++) {
		freq[(unsigned char)str[i]]++;
	}
}

/* Compare two frequency arrays */
static int compare_freq_arrays(const int* freq1, const int* freq2)
{
	for (int i = 0; i < CHAR_COUNT; i++) {
		if (freq1[i] != freq2[i]) {
			return 0;
		}
	}
	return 1;
}

void anagrams_for(const char *word, struct candidates *candidates)
{
	if ((word == NULL) || (candidates == NULL))
		return;

	char or_word[MAX_STR_LEN];
	const int wlen = mstrlen_cp((char*) word, or_word);
	
	int word_freq[CHAR_COUNT];
	create_freq_array(or_word, wlen, word_freq);

	for (int i = 0; i < (int)candidates->count; i++) {
		struct candidate *tmp = &(candidates->candidate[i]);
		
		// Create a copy for length calculation without modifying original
		char temp_candidate[MAX_STR_LEN];
		strcpy(temp_candidate, tmp->candidate);
		
		int llen = strlen(temp_candidate);
		
		// Quick length check first
		if (llen != wlen) {
			tmp->is_anagram = NOT_ANAGRAM;
			continue;
		}
		
		// Convert to lowercase
		for (int j = 0; j < llen; j++) {
			temp_candidate[j] = tolower(temp_candidate[j]);
		}
		
		int candidate_freq[CHAR_COUNT];
		create_freq_array(temp_candidate, llen, candidate_freq);
		
		tmp->is_anagram = compare_freq_arrays(word_freq, candidate_freq) ? IS_ANAGRAM : NOT_ANAGRAM;
	}
}