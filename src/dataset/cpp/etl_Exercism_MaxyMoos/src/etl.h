#ifndef ETL_H_
#define ETL_H_

#include <vector>
#include <map>

using namespace std;

namespace etl
{
    map<char, int> transform(map<int, vector<char>> input);
}

#endif