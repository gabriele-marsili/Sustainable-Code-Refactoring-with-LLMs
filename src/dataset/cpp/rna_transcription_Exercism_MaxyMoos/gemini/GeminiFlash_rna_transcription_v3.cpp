#include "rna_transcription.h"
#include <algorithm>

using namespace std;

char transcription::to_rna(char input)
{
    return transTable[input];
}

string transcription::to_rna(string input)
{
    string result;
    result.reserve(input.length());
    transform(input.begin(), input.end(), back_inserter(result), [this](char c){ return transTable[c]; });
    return result;
}