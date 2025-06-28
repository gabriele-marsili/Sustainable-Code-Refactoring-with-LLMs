#ifndef CLOCK_H_
#define CLOCK_H_

#include <string>

namespace date_independent
{
    class clock
    {
        int hour;
        int min;
        clock();
    public:
        static clock at(int hour);
        static clock at(int hour, int min);
        clock plus(int min);
        clock minus(int min);
        bool operator==(clock other) const;
        bool operator!=(clock other) const;
        operator std::string() const;
    };
}

#endif