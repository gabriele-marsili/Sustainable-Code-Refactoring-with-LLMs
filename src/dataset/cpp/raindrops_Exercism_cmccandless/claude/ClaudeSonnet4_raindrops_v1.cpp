#include "raindrops.h"

string raindrops::convert(int x)
{
  string result;
  
  bool has_factor = false;
  
  if (x % 3 == 0) {
     result += "Pling";
     has_factor = true;
  }
  if (x % 5 == 0) {
     result += "Plang";
     has_factor = true;
  }
  if (x % 7 == 0) {
     result += "Plong";
     has_factor = true;
  }
  
  if (!has_factor) {
     result = std::to_string(x);
  }
  
  return result;
}