#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int check_str(const char *s);
char *err(char *res);
int is_allowed(char c);
void cpcnt(char **dst, char **src, int count);
void consume_space(char **s);
int peek(int count, int (*check) (int), char *s);

#define NUMLEN 10

char *phone_number_clean(const char *input)
{
	if (!input || !*input)
		return NULL;

	char *res = (char *)malloc(NUMLEN + 1);
	if (!res)
		return NULL;

	char *tmp_r = res;
	const char *tmp_i = input;
	int digits = 0;

	consume_space((char **)&tmp_i);

	/* '+1 ' */
	if (*tmp_i == '+') {
		if (*(tmp_i + 1) != '1' || *(tmp_i + 2) != ' ')
			goto error;
		tmp_i += 3;
	}

	/* '(ddd)' */
	if (*tmp_i == '(') {
		if (!peek(3, isdigit, (char *)(tmp_i + 1)) || *(tmp_i + 4) != ')')
			goto error;
		tmp_i++;
		cpcnt(&tmp_r, (char **)&tmp_i, 3);
		tmp_i++;
		digits += 3;
	}

	consume_space((char **)&tmp_i);

	while (*tmp_i) {
		if (isdigit(*tmp_i)) {
			if (++digits > NUMLEN)
				goto error;
			*tmp_r++ = *tmp_i;
		} else if (!is_allowed(*tmp_i)) {
			goto error;
		}
		tmp_i++;
	}
	*tmp_r = '\0';

	if (digits != NUMLEN)
		goto error;

	return res;

error:
	free(res);
	return NULL;
}

char *phone_number_get_area_code(const char *input)
{
	char *cl = phone_number_clean(input);
	if (!cl)
		return NULL;

	char *res = (char *)malloc(4);
	if (!res) {
		free(cl);
		return NULL;
	}

	memcpy(res, cl, 3);
	res[3] = '\0';

	free(cl);
	return res;
}

char *phone_number_format(const char *input)
{
	char *cl = phone_number_clean(input);
	if (!cl)
		return NULL;

	char *res = (char *)malloc(15);
	if (!res) {
		free(cl);
		return NULL;
	}

	snprintf(res, 15, "(%.3s) %.3s-%.4s", cl, cl + 3, cl + 6);

	free(cl);
	return res;
}

/**
 ********************************************
 * helpers
 ********************************************
 */

int check_str(const char *s)
{
	return (s && *s) ? strlen(s) : -1;
}

char *err(char *err)
{
	memset(err, '0', NUMLEN);
	err[NUMLEN] = '\0';
	return err;
}

int is_allowed(char c)
{
	return (c == ' ' || c == '.' || c == '-');
}

/* copy count chars skipping space */
void cpcnt(char **dst, char **src, int count)
{
	while (count--) {
		while (is_allowed(**src))
			(*src)++;
		*(*dst)++ = *(*src)++;
	}
}

void consume_space(char **s)
{
	while (**s == ' ')
		(*s)++;
}

int peek(int count, int (*check)(int), char *s)
{
	while (count-- && *s) {
		while (is_allowed(*s))
			s++;
		if (!check(*s++))
			return 0;
	}
	return count < 0;
}