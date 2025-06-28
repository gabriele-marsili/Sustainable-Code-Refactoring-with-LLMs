#include "series.h"
#include <stdexcept>
#include <iostream>

using namespace std;

typedef vector<int>::iterator int_iter;

vector<int> series::digits(string input)
{
    vector<int> result;
    for(auto chr: input)
        result.push_back(int(chr) - '0');
    return result;
}

vector<vector<int>> series::slice(string input, int length)
{
    if (length > input.length())
        throw domain_error("Slice length cannot be superior to string length");

    vector<vector<int>> result;
    vector<int> digits = series::digits(input);
    int_iter start = digits.begin();
    int_iter slice = start + length;
    vector<int> tmp;

    do
    {
        for(int_iter it = start; it != slice; it++)
        {
            tmp.push_back(*it);
        }
        result.push_back(tmp);
        tmp.clear();
        if (slice == digits.end())
            break;
        start++;
        slice++;
    } while (1);
    
    return result;
}