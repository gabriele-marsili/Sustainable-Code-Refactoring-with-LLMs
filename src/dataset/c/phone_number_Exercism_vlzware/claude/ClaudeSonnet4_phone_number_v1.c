#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

static inline int is_allowed_char(char c);
static inline void skip_allowed_chars(const char **s);
static char *create_error_result(void);

#define NUMLEN 10
#define FORMATTED_LEN 14
#define AREA_CODE_LEN 3

char *phone_number_clean(const char *input)
{
    if (!input || !*input)
        return NULL;

    char *res = malloc(NUMLEN + 1);
    if (!res)
        return NULL;

    const char *src = input;
    char *dst = res;
    int digit_count = 0;
    
    // Skip leading spaces
    while (*src == ' ') src++;
    
    // Handle country code '+1 '
    if (*src == '+') {
        if (src[1] != '1' || src[2] != ' ') {
            free(res);
            return create_error_result();
        }
        src += 3;
    }
    
    // Handle area code in parentheses '(ddd)'
    if (*src == '(') {
        src++;
        for (int i = 0; i < 3; i++) {
            while (is_allowed_char(*src)) src++;
            if (!isdigit(*src)) {
                free(res);
                return create_error_result();
            }
            *dst++ = *src++;
            digit_count++;
        }
        while (is_allowed_char(*src)) src++;
        if (*src != ')') {
            free(res);
            return create_error_result();
        }
        src++;
    }
    
    // Skip spaces after area code
    while (*src == ' ') src++;
    
    // Skip leading '1' if followed by 10 digits
    if (*src == '1') {
        const char *temp = src + 1;
        int remaining_digits = 0;
        while (*temp) {
            if (isdigit(*temp)) {
                remaining_digits++;
            } else if (!is_allowed_char(*temp)) {
                break;
            }
            temp++;
        }
        if (remaining_digits == NUMLEN) {
            src++;
        }
    }
    
    // Process remaining characters
    while (*src) {
        if (isdigit(*src)) {
            if (++digit_count > NUMLEN) {
                free(res);
                return create_error_result();
            }
            *dst++ = *src;
        } else if (!is_allowed_char(*src)) {
            free(res);
            return create_error_result();
        }
        src++;
    }
    
    *dst = '\0';
    
    if (digit_count != NUMLEN) {
        free(res);
        return create_error_result();
    }
    
    return res;
}

char *phone_number_get_area_code(const char *input)
{
    char *cleaned = phone_number_clean(input);
    if (!cleaned)
        return NULL;
    
    char *area_code = malloc(4);
    if (!area_code) {
        free(cleaned);
        return NULL;
    }
    
    memcpy(area_code, cleaned, 3);
    area_code[3] = '\0';
    
    free(cleaned);
    return area_code;
}

char *phone_number_format(const char *input)
{
    char *cleaned = phone_number_clean(input);
    if (!cleaned)
        return NULL;
    
    if (cleaned[0] == '0') {
        return cleaned;
    }
    
    char *formatted = malloc(FORMATTED_LEN + 1);
    if (!formatted) {
        free(cleaned);
        return NULL;
    }
    
    // Format: (xxx) xxx-xxxx
    formatted[0] = '(';
    memcpy(formatted + 1, cleaned, 3);
    formatted[4] = ')';
    formatted[5] = ' ';
    memcpy(formatted + 6, cleaned + 3, 3);
    formatted[9] = '-';
    memcpy(formatted + 10, cleaned + 6, 4);
    formatted[14] = '\0';
    
    free(cleaned);
    return formatted;
}

/**
 ********************************************
 * helpers
 ********************************************
 */

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

int peek(int count, int (*check)(int), char *s)
{
    for (int i = 0; i < count && *s; i++) {
        while (is_allowed(*s))
            s++;
        if (!check(*s++))
            return 0;
    }
    return 1;
}

static inline int is_allowed_char(char c)
{
    return (c == ' ' || c == '.' || c == '-');
}

static char *create_error_result(void)
{
    char *res = malloc(NUMLEN + 1);
    if (res) {
        memset(res, '0', NUMLEN);
        res[NUMLEN] = '\0';
    }
    return res;
}