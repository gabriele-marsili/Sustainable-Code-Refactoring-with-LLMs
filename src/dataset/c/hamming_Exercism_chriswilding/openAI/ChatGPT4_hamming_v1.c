#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
  if (!lhs || !rhs)
  {
    return -1;
  }

  int distance = 0;

  for (size_t i = 0; lhs[i] && rhs[i]; i++)
  {
    if (lhs[i] != rhs[i])
    {
      distance++;
    }
  }

  return (lhs[0] && rhs[0]) ? distance : -1;
}