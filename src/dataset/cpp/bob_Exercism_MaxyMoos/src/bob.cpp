#include <iostream>
#include <string>
#include <boost/regex.hpp>
#include <boost/algorithm/string.hpp>


namespace bob
{
    std::string hey(std::string input)
    {
        const boost::regex alphabet("[A-Z]+");
        const boost::regex empty("|[ ]+");
        const boost::regex question(".*\\?[ ]*");

        std::string upperStr = boost::to_upper_copy<std::string>(input);
        if (boost::regex_match(input,empty))
        {
            return "Fine. Be that way!";
        }
        if (boost::equals(upperStr, input))
        {
            std::string::const_iterator start, end;
            start = input.begin();
            end = input.end();
            boost::match_results<std::string::const_iterator> resultIterator;
            boost::match_flag_type flags = boost::match_default;
            if (boost::regex_search(start, end, resultIterator, alphabet, flags))
            {
                return "Whoa, chill out!";
            }
        }
        if (boost::regex_match(input, question))
        {
            return "Sure.";
        }

        return "Whatever.";
    }

};
