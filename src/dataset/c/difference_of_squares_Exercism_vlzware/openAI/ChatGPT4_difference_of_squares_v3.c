#include "difference_of_squares.h"

inline int square_of_sum(const int n)
{
    int trnum = n * (n + 1) / 2;
    return trnum * trnum;
}

inline int sum_of_squares(const int n)
{
    return n * (n + 1) * (2 * n + 1) / 6;
}

inline int difference_of_squares(const int n)
{
    return (n * (n + 1) / 2) * (n * (n + 1) / 2) - (n * (n + 1) * (2 * n + 1) / 6);
}