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

char *to_roman_numeral(unsigned int number) {
  char *output = (char *)malloc(16 * sizeof(char));
  if (output == NULL) return NULL;
  output[0] = '\0';

  char *ptr = output;
  for (int i = 0; i < 13; i++) {
    while (number >= arabicToRomanMap[i].arabic) {
      strcpy(ptr, arabicToRomanMap[i].roman);
      ptr += strlen(arabicToRomanMap[i].roman);
      number -= arabicToRomanMap[i].arabic;
    }
  }

  return output;
}