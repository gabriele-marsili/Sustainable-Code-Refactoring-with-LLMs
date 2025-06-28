#ifndef HEXADECIMAL_H_
#define HEXADECIMAL_H_

#include <string>
#include <map>

using namespace std;

namespace hexadecimal
{
    static map<char, int> hexaTable = {{'a', 10}, {'b', 11}, {'c', 12}, {'d', 13}, {'e', 14}, {'f', 15}};
    int convert(string input);
}

#endif