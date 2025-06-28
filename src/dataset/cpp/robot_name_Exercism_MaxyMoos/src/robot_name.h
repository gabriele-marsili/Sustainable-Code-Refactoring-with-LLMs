#ifndef ROBOT_NAME_H_
#define ROBOT_NAME_H

#include <string>

using namespace std;

namespace robot_name
{
    class robot
    {
        string _name;
    public:
        robot();
        string name() const;
        void reset();
    protected:
        void generateName();
    };
}

#endif