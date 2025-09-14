#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int check_str(const char *s);
char *err(char *res);
int is_allowed(char c);
void cpcnt(char **dst, char **src, int count);
void consume_space(char **s);
int peek(int count, int (*check) (int), char*s);

#define NUMLEN 10

char *phone_number_clean(const char *input)
{
	if (!input || !*input)
		return NULL;

	char *res = malloc(NUMLEN + 1);
	if (!res)
		return NULL;

	const char *src = input;
	char *dst = res;
	int digits = 0;

	while (*src == ' ') src++;

	if (*src == '+') {
		if (src[1] != '1' || src[2] != ' ') {
			memset(res, '0', NUMLEN);
			res[NUMLEN] = '\0';
			return res;
		}
		src += 3;
	}

	if (*src == '(') {
		src++;
		for (int i = 0; i < 3; i++) {
			while (*src == ' ' || *src == '.' || *src == '-') src++;
			if (!isdigit(*src)) {
				memset(res, '0', NUMLEN);
				res[NUMLEN] = '\0';
				return res;
			}
			*dst++ = *src++;
			digits++;
		}
		if (*src != ')') {
			memset(res, '0', NUMLEN);
			res[NUMLEN] = '\0';
			return res;
		}
		src++;
	}

	while (*src == ' ') src++;

	if (*src == '1') {
		const char *temp = src + 1;
		int valid_digits = 0;
		while (*temp && valid_digits < NUMLEN) {
			if (*temp == ' ' || *temp == '.' || *temp == '-') {
				temp++;
				continue;
			}
			if (!isdigit(*temp)) break;
			valid_digits++;
			temp++;
		}
		if (valid_digits == NUMLEN) src++;
	}

	while (*src) {
		if (isdigit(*src)) {
			if (++digits > NUMLEN) {
				memset(res, '0', NUMLEN);
				res[NUMLEN] = '\0';
				return res;
			}
			*dst++ = *src;
		} else if (*src != ' ' && *src != '.' && *src != '-') {
			memset(res, '0', NUMLEN);
			res[NUMLEN] = '\0';
			return res;
		}
		src++;
	}

	*dst = '\0';

	if (digits != NUMLEN) {
		memset(res, '0', NUMLEN);
		res[NUMLEN] = '\0';
	}

	return res;
}

char *phone_number_get_area_code(const char *input)
{
	char *cl = phone_number_clean(input);
	if (!cl)
		return NULL;

	char *res = malloc(4);
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

	if (cl[0] == '0')
		return cl;

	char *res = malloc(15);
	if (!res) {
		free(cl);
		return NULL;
	}

	res[0] = '(';
	memcpy(res + 1, cl, 3);
	res[4] = ')';
	res[5] = ' ';
	memcpy(res + 6, cl + 3, 3);
	res[9] = '-';
	memcpy(res + 10, cl + 6, 4);
	res[14] = '\0';

	free(cl);
	return res;
}

int check_str(const char *s)
{
	if (!s || !*s)
		return -1;
	return strlen(s);
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

void cpcnt(char **dst, char **src, int count)
{
	for (int i = 0; i < count; i++) {
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

int peek(int count, int (*check) (int), char*s)
{
	for (int i = 0; i < count && *s; i++) {
		while(is_allowed(*s))
			s++;
		if (!check(*s++))
			return 0;
	}
	return 1;
}