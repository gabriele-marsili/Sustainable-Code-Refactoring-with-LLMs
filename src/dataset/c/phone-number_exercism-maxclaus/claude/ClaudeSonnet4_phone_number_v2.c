#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  char *output = malloc(11); // 10 digits + null terminator
  if (!output) return NULL;
  
  int output_size = 0;
  const char *p = input;
  
  // Single pass through input
  while (*p && output_size <= phone_number_size) {
    if (isdigit(*p)) {
      // Skip country code '1' at start
      if (output_size == 0 && *p == '1') {
        p++;
        continue;
      }
      
      // Validate first and fourth digits (must be 2-9)
      if ((output_size == 0 || output_size == 3) && (*p < '2')) {
        // Invalid - fill with zeros and return
        memset(output, '0', phone_number_size);
        output[phone_number_size] = '\0';
        return output;
      }
      
      if (output_size < phone_number_size) {
        output[output_size++] = *p;
      } else {
        // Too many digits - invalid
        memset(output, '0', phone_number_size);
        output[phone_number_size] = '\0';
        return output;
      }
    }
    p++;
  }
  
  // Check if we have exactly 10 digits
  if (output_size == phone_number_size) {
    output[phone_number_size] = '\0';
  } else {
    // Invalid length - fill with zeros
    memset(output, '0', phone_number_size);
    output[phone_number_size] = '\0';
  }
  
  return output;
}