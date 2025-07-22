#include "raindrops.h"

string raindrops::convert(int x)
{
  string result;
  
  bool hasFactor = false;
  
  if (x % 3 == 0) {
     result += "Pling";
     hasFactor = true;
  }
  if (x % 5 == 0) {
     result += "Plang";
     hasFactor = true;
  }
  if (x % 7 == 0) {
     result += "Plong";
     hasFactor = true;
  }
  
  if (!hasFactor) result = std::to_string(x);
  
  return result;
}