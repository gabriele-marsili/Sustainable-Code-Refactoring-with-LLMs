#include "say.h"
#include <vector>
#include <cstdlib>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <stdexcept>

using namespace std;

typedef string::reverse_iterator str_iter;


string say_number(string numItem)
{
    string numCpy = numItem;
    string result = "";

    if (numCpy.length() == 3) {
        if (numCpy[0] != '0') {
            result += say::units[stoi(numCpy.substr(0, 1))] + " hundred ";
        }
        numCpy = numCpy.substr(1);
    }

    if (numCpy.length() > 0) {
        int rest = stoi(numCpy);
        if (rest < 20) {
            if (rest == 0 && result.length() > 0)
                return result.substr(0, result.length() - 1);
            else
                result += say::units[rest];
        }
        else {
            if (rest % 10 == 0)
                result += say::tens[rest / 10];
            else
                result += say::tens[rest / 10] + "-" + say::units[rest % 10];
        }
    }
    return result;
}

string say::in_english(ull num)
{
    if (num < 0 || num >= 1000ULL*1000ULL*1000ULL*1000ULL)
        throw std::domain_error("Not in range");

    string numStr = to_string(num);
    string result = "";
    vector<string> groups;
    for(str_iter it = numStr.rbegin(); it != numStr.rend(); it++)
    {
        if ( !groups.empty() && groups.front().length() < 3 )
        {
            groups.front() = *it + groups.front();
        }
        else
        {
            groups.insert(groups.begin(), "");
            groups.front() = *it + groups.front();
        }
    }

    int vectSize = groups.size();
    string suffixes[]{"", "thousand ", "million ", "billion ", "trillion "};
    
    for (int ind = 0; ind < vectSize; ind++)
    {
        int realInd = vectSize - 1 - ind;
        string tmp = say_number(groups[ind]);
        if (tmp == "zero" && result.length() != 0)
            continue;
        else
            result += say_number(groups[ind]) + " " + suffixes[realInd];
    }
    return boost::algorithm::trim_right_copy(result);
}