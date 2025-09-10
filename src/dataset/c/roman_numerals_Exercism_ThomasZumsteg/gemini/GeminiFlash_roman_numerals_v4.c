#include "roman_numerals.h"
#include <stdlib.h>
#include <string.h>

#define NUM_ROMAN_DIGITS 13

struct RomanNumeral {
  int arabic;
  char *greek;
};

const struct RomanNumeral ROMANDIGITS[NUM_ROMAN_DIGITS] = {
    {1, "I"},   {4, "IV"},  {5, "V"},   {9, "IX"},  {10, "X"},  {40, "XL"},
    {50, "L"},  {90, "XC"},  {100, "C"}, {400, "CD"}, {500, "D"}, {900, "CM"},
    {1000, "M"}};

char *to_roman_numeral(int arabic) {
  char *greek = malloc(sizeof(char) * 64);
  if (greek == NULL) {
    return NULL; // Handle allocation failure
  }
  greek[0] = '\0'; // Initialize as an empty string

  char *ptr = greek; // Use a pointer to track the current position

  for (int i = NUM_ROMAN_DIGITS - 1; i >= 0; i--) {
    while (arabic >= ROMANDIGITS[i].arabic) {
      strcpy(ptr, ROMANDIGITS[i].greek); // Copy the string directly
      ptr += strlen(ROMANDIGITS[i].greek); // Advance the pointer
      arabic -= ROMANDIGITS[i].arabic;
    }
  }

  return greek;
}