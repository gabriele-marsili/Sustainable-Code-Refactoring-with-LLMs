#ifndef SERIES_H_
#define SERIES_H_

#include <vector>
#include <string>

using namespace std;

namespace series
{
    vector<int> digits(string input);
    vector<vector<int>> slice(string input, int length);
}

#endif