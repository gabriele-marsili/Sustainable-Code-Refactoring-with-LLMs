#include "raindrops.h"

string raindrops::convert(int x)
{
   string result;
   
   const bool div3 = x % 3 == 0;
   const bool div5 = x % 5 == 0;
   const bool div7 = x % 7 == 0;
   
   if (div3 | div5 | div7) {
      result.reserve(15);
      if (div3) result += "Pling";
      if (div5) result += "Plang";
      if (div7) result += "Plong";
   } else {
      result = std::to_string(x);
   }
   
   return result;
}