#include "roman_numerals.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  unsigned int arabic;
  const char *roman;
} ArabicToRoman;

static const ArabicToRoman arabicToRomanMap[] = {
    {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"}, {100, "C"},
    {90, "XC"},  {50, "L"},   {40, "XL"}, {10, "X"},   {9, "IX"},
    {5, "V"},    {4, "IV"},   {1, "I"},
};

static const int MAP_SIZE = sizeof(arabicToRomanMap) / sizeof(arabicToRomanMap[0]);

char *to_roman_numeral(unsigned int number) {
  if (number == 0) {
    char *output = malloc(1);
    if (output) output[0] = '\0';
    return output;
  }

  char buffer[16];
  char *ptr = buffer;
  
  for (int i = 0; i < MAP_SIZE; i++) {
    while (number >= arabicToRomanMap[i].arabic) {
      const char *roman = arabicToRomanMap[i].roman;
      while (*roman) {
        *ptr++ = *roman++;
      }
      number -= arabicToRomanMap[i].arabic;
    }
  }
  *ptr = '\0';
  
  size_t len = ptr - buffer;
  char *output = malloc(len + 1);
  if (output) {
    memcpy(output, buffer, len + 1);
  }
  
  return output;
}