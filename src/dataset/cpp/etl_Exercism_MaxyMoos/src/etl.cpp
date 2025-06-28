#include "etl.h"
#include <iostream>

using namespace std;

map<char, int> etl::transform(map<int, vector<char>> input)
{
    map<char, int> result;
    for (auto i: input)
    {
        for (auto j: i.second)
        {
            result[tolower(j)] = i.first;
        }
    }
    return result;
}