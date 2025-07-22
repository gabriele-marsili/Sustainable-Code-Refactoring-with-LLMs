#include "raindrops.h"

using namespace std;

string raindrops::convert(int number)
{
   string result;
   
   const bool div3 = (number % 3 == 0);
   const bool div5 = (number % 5 == 0);
   const bool div7 = (number % 7 == 0);
   
   if (div3 | div5 | div7) {
      result.reserve(15);
      if (div3) result += "Pling";
      if (div5) result += "Plang";
      if (div7) result += "Plong";
      return result;
   }
   
   return to_string(number);
}