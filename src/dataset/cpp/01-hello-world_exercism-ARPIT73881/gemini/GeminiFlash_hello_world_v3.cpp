#include "hello_world.h"
#include <string>

using namespace std;

namespace hello_world
{

    string hello()
    {
        static const string message = "Hello, World!";
        return message;
    }

}