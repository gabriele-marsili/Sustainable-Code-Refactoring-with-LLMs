#include "raindrops.h"

string raindrops::convert(int x)
{
   const char* parts[] = {nullptr, nullptr, nullptr};
   int i = 0;

   if (x % 3 == 0) parts[i++] = "Pling";
   if (x % 5 == 0) parts[i++] = "Plang";
   if (x % 7 == 0) parts[i++] = "Plong";

   if (i == 0) return std::to_string(x);

   string result;
   for (int j = 0; j < i; ++j) result += parts[j];
   return result;
}
