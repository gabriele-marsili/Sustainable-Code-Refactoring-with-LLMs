#include <math.h>
#include <stdexcept>

#include "all_your_base.h"

namespace all_your_base
{
    int toDecimalNumber(unsigned int fromBase, std::vector<unsigned int> digits)
    {
        int num = 0;
        for (auto& digit : digits)
        {
            if (digit >= (unsigned)fromBase) throw std::invalid_argument("Input digits cannot be equal or greater than input base.");
            num = num * fromBase + digit;
        }
        return num;
    }

    std::vector<unsigned int> fromDecimalNumber(unsigned int decimalNumber, unsigned int toBase)
    {
        std::vector<unsigned int> digits;
        for (auto rem = decimalNumber; rem != 0; rem /= toBase)
        {
            digits.insert(digits.begin(), rem % toBase);
        }
        return digits;
    }

    std::vector<unsigned int> convert(unsigned int fromBase, std::vector<unsigned int> digits, unsigned int toBase)
    {
        if (fromBase < 2) throw std::invalid_argument("Input base must be 2 or greater.");
        if (toBase < 2) throw std::invalid_argument("Output base must be 2 or greater.");
        return fromDecimalNumber(toDecimalNumber(fromBase, digits), toBase);
    }
} // namespace all_your_base
