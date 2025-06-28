#include "hamming.h"
#include <stdexcept>
#include <boost/regex.hpp>


namespace hamming
{
    int compute(std::string first, std::string second)
    {
        if (first.length() != second.length())
            throw std::domain_error("Lengths differ");
        boost::regex koChars("[^ATGC]+");
        if (boost::regex_search(first, koChars) || boost::regex_search(second, koChars))
            throw std::domain_error("Wrong characters in input strings");

        int diff = 0;
        for(int i = 0; i < first.length(); i++)
        {
            if (first[i] != second[i])
                diff++;
        }
        return diff;
    }
}
