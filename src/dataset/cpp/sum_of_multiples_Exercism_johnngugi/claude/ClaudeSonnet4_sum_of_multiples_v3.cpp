#include "sum_of_multiples.h"
#include <unordered_set>
#include <numeric>
using namespace std;

int sum_of_multiples::to(list<int> l, int n)
{
    unordered_set<int> unique_multiples;
    
    for (const int& factor : l)
    {
        if (factor <= 0 || factor >= n) continue;
        
        for (int multiple = factor; multiple < n; multiple += factor)
        {
            unique_multiples.insert(multiple);
        }
    }
    
    return accumulate(unique_multiples.begin(), unique_multiples.end(), 0);
}