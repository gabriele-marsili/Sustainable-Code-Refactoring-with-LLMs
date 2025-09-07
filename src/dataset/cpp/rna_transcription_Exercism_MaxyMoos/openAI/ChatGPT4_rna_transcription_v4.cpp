#include "rna_transcription.h"
#include <string>

using namespace std;

char transcription::to_rna(char input)
{
    return transTable[input];
}

string transcription::to_rna(const string& input)
{
    string result;
    result.reserve(input.size());
    for (char c : input)
    {
        result.push_back(transTable[c]);
    }
    return result;
}