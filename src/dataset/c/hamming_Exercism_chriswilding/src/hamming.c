#include "hamming.h"

#include <string.h>

int compute(const char *lhs, const char *rhs)
{
  if (lhs == NULL || rhs == NULL)
  {
    return -1;
  }

  size_t lhs_len = strlen(lhs);
  size_t rhs_len = strlen(rhs);

  if (lhs_len != rhs_len)
  {
    return -1;
  }

  int distance = 0;

  for (size_t i = 0; i < lhs_len; i++)
  {
    if (lhs[i] != rhs[i])
    {
      distance++;
    }
  }

  return distance;
}
