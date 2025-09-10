#include "wordy.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static bool is_numeric(const char *str) {
  if (!str)
    return false;

  int i = 0;
  if (str[0] == '+' || str[0] == '-')
    i = 1;

  for (; str[i] != '\0'; ++i) {
    if (!isdigit((unsigned char)str[i]))
      return false;
  }
  return true;
}

static int word_count(const char *str) {
  if (!str)
    return 0;

  int count = 0;
  bool in_word = false;
  for (int i = 0; str[i] != '\0'; ++i) {
    if (str[i] == ' ') {
      in_word = false;
    } else if (!in_word) {
      in_word = true;
      count++;
    }
  }
  return count;
}

static bool starts_with(const char *str, const char *prefix) {
  if (!str || !prefix)
    return false;
  return strncmp(str, prefix, strlen(prefix)) == 0;
}

static bool is_valid_operator(const char *str) {
  if (!str)
    return false;

  return (strcmp(str, "plus") == 0 || strcmp(str, "minus") == 0 ||
          strcmp(str, "by") == 0 || strcmp(str, "multiplied") == 0 ||
          strcmp(str, "divided") == 0);
}

bool answer(const char *question, int *result) {
  if (!question || !result)
    return false;

  if (!starts_with(question, "What is "))
    return false;

  size_t question_len = strlen(question);
  if (question_len <= 8)
    return false;

  char *mutable_question = strdup(question);
  if (!mutable_question)
    return false;

  if (mutable_question[question_len - 1] == '?')
    mutable_question[question_len - 1] = '\0';

  char *token;
  char *rest = mutable_question + 8;
  int num_words = word_count(rest);

  if (num_words < 1) {
    free(mutable_question);
    return false;
  }

  token = strtok_r(rest, " ", &rest);

  if (!token) {
    free(mutable_question);
    return false;
  }

  if (!is_numeric(token)) {
    free(mutable_question);
    return false;
  }

  *result = atoi(token);

  char *prev_token = NULL;
  while ((token = strtok_r(NULL, " ", &rest)) != NULL) {
    if (prev_token && strcmp(token, prev_token) == 0) {
      free(mutable_question);
      return false;
    }

    if (is_numeric(token)) {
      if (!prev_token || !is_valid_operator(prev_token)) {
        free(mutable_question);
        return false;
      }

      int num = atoi(token);

      if (strcmp(prev_token, "plus") == 0) {
        *result += num;
      } else if (strcmp(prev_token, "minus") == 0) {
        *result -= num;
      } else if (strcmp(prev_token, "by") == 0) {
        char *prev_prev_token = strtok_r(NULL, " ", &rest);
        if (!prev_prev_token) {
          free(mutable_question);
          return false;
        }
        if (strcmp(prev_prev_token, "divided") == 0) {
          *result /= num;
        } else if (strcmp(prev_prev_token, "multiplied") == 0) {
          *result *= num;
        } else {
          free(mutable_question);
          return false;
        }
      }
    } else {
      prev_token = token;
    }
  }

  free(mutable_question);
  return true;
}