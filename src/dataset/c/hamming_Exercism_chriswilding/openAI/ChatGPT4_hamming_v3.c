#include "hamming.h"

#include <string.h>

int compute(const char *lhs, const char *rhs)
{
  if (!lhs || !rhs)
    return -1;

  size_t i = 0;
  int distance = 0;

  while (lhs[i] && rhs[i])
  {
    if (lhs[i] != rhs[i])
      distance++;
    i++;
  }

  return (lhs[i] || rhs[i]) ? -1 : distance;
}