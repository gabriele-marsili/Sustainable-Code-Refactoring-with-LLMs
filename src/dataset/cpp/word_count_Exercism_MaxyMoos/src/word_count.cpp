#include "word_count.h"
#include <vector>
#include <boost/algorithm/string.hpp>
#include <boost/regex.hpp>

using namespace std;

map<string, int> word_count::words(string inputString)
{
    map<string, int> result;
    vector<string> splitVector;

    boost::regex alpha("[a-z0-9]+");
    
    boost::algorithm::split(splitVector, inputString, boost::algorithm::is_any_of(" ,.:;!&@$%^¨*µ\r\n\t"), boost::algorithm::token_compress_on);

    for(auto curWord: splitVector)
    {
        boost::algorithm::to_lower(curWord);
        boost::algorithm::trim_left_if(curWord, boost::algorithm::is_any_of("\'\""));
        boost::algorithm::trim_right_if(curWord, boost::algorithm::is_any_of("\'\""));
        if (boost::regex_search(curWord, alpha))
            result[curWord] += 1;
    }
    return result;
}
