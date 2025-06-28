#include <string>
#include <map>

using namespace std;

namespace transcription
{
    static map<char, char> transTable{ {'C', 'G'}, {'G', 'C'}, {'A', 'U'}, {'T', 'A'}};
    char to_rna(char input);
    string to_rna(string input);
}