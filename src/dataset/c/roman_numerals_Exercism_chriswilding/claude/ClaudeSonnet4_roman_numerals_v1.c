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
  char *output = (char *)malloc(16 * sizeof(char));
  char *ptr = output;
  
  for (int i = 0; i < MAP_SIZE; i++) {
    const ArabicToRoman *entry = &arabicToRomanMap[i];
    while (number >= entry->arabic) {
      const char *roman = entry->roman;
      while (*roman) {
        *ptr++ = *roman++;
      }
      number -= entry->arabic;
    }
  }
  
  *ptr = '\0';
  return output;
}