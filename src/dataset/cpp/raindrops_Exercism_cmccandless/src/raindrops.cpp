#include "raindrops.h"

string raindrops::convert(int x)
{
   string result;
   result.reserve(15); // "PlingPlangPlong" max length
   
   if (x % 3 == 0) result += "Pling";
   if (x % 5 == 0) result += "Plang";
   if (x % 7 == 0) result += "Plong";
   
   if (result.empty()) result = std::to_string(x);
   
   return result;
}