#include <iostream>
#include <string>

using namespace std;

namespace food_chain
{
    static string finalStr = "I don't know why she swallowed the fly. Perhaps she'll die.\n";
    static string firstLine = "I know an old lady who swallowed a ";

    string verse(int index);
    string verses(int lowIndex, int highIndex);
    string sing();
}

class animal
{
public:
    animal(string name, string secondLine);
    animal(string name, string secondLine, string optional);

    string name;
    string secondLine;
    string optional;
};