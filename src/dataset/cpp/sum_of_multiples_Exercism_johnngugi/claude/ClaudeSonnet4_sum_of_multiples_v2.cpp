#include "sum_of_multiples.h"
#include <unordered_set>
using namespace std;

int sum_of_multiples::to(list<int> l, int n)
{
    unordered_set<int> numbers;
    
    for (int factor : l)
    {
        if (factor > 0 && factor < n)
        {
            for (int multiple = factor; multiple < n; multiple += factor)
            {
                numbers.insert(multiple);
            }
        }
    }
    
    int result = 0;
    for (int num : numbers)
    {
        result += num;
    }
    
    return result;
}