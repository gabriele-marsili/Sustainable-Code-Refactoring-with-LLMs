#include "rna_transcription.h"

using namespace std;

char transcription::to_rna(char input)
{
    return transTable[input];
}

string transcription::to_rna(string input)
{
    string result;
    result.reserve(input.size());
    for (const char& c : input)
    {
        result += transTable[c];
    }
    return result;
}