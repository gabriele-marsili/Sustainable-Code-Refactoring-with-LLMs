#include "sum_of_multiples.h"
#include <unordered_set>
#include <numeric>
using namespace std;

void get_sum(int first, int limit, unordered_set<int> &temp_set)
{
    for (int i = first; i < limit; i += first)
    {
        temp_set.insert(i);
    }
}

int sum_of_multiples::to(list<int> l, int n)
{
    unordered_set<int> numbers;

    for (int num : l)
    {
        if (num > 0)
        {
            get_sum(num, n, numbers);
        }
    }

    return accumulate(numbers.begin(), numbers.end(), 0);
}