#include "hamming.h"

#include <string.h>

int compute(const char *lhs, const char *rhs)
{
  if (lhs == NULL || rhs == NULL)
  {
    return -1;
  }

  int distance = 0;
  size_t i = 0;

  // Single pass comparison with early length mismatch detection
  while (lhs[i] != '\0' || rhs[i] != '\0')
  {
    if (lhs[i] == '\0' || rhs[i] == '\0')
    {
      return -1; // Length mismatch
    }
    
    if (lhs[i] != rhs[i])
    {
      distance++;
    }
    
    i++;
  }

  return distance;
}