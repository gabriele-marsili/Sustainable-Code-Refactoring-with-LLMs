#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  const char *p = input;
  
  char *output = malloc(11); // 10 digits + null terminator
  if (!output) return NULL;
  
  int output_size = 0;
  char c;
  
  // Single pass through input
  while ((c = *p++)) {
    if (c < '0' || c > '9') continue;
    
    // Country code, filter it out
    if (output_size == 0 && c == '1') continue;
    
    // First and fourth digits must be 2-9
    if ((output_size == 0 || output_size == 3) && c < '2') {
      // Invalid - fill with zeros and return
      memset(output, '0', phone_number_size);
      output[phone_number_size] = '\0';
      return output;
    }
    
    if (output_size >= phone_number_size) {
      // Too many digits - fill with zeros and return
      memset(output, '0', phone_number_size);
      output[phone_number_size] = '\0';
      return output;
    }
    
    output[output_size++] = c;
  }
  
  if (output_size != phone_number_size) {
    // Wrong number of digits - fill with zeros
    memset(output, '0', phone_number_size);
  }
  
  output[phone_number_size] = '\0';
  return output;
}

char *phone_number_clean_v2(const char *input) {
  return phone_number_clean(input);
}

char *phone_number_clean_v1(const char *input) {
  return phone_number_clean(input);
}