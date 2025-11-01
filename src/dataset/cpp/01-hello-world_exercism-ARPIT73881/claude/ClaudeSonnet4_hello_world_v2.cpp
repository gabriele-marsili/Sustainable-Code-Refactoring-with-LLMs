#include "hello_world.h"

using namespace std;

namespace hello_world
{

    const string& hello()
    {
        static const string greeting = "Hello, World!";
        return greeting;
    }

}