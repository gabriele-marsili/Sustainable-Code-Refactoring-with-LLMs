#include "raindrops.h"
#include <string> // Required for std::to_string

// Using a static const string_view for the constant strings avoids repeated string
// creations and allocations. string_view is efficient for read-only string data.
static constexpr std::string_view PLING = "Pling";
static constexpr std::string_view PLANG = "Plang";
static constexpr std::string_view PLONG = "Plong";

string raindrops::convert(int x)
{
   // Pre-allocate a string with enough capacity to avoid reallocations.
   // "PlingPlangPlong" has 15 characters, but adding one for null terminator
   // or just reserving enough to be safe is good practice.
   // Using a fixed size char array for small strings can be even more efficient
   // as it completely avoids heap allocation for the string buffer.
   // If the string does not exceed the Small String Optimization (SSO) buffer,
   // then heap allocation is avoided anyway for std::string.
   char buffer[16]; // Max "PlingPlangPlong" + null terminator
   int offset = 0;

   // Using if-else if structure can be slightly more efficient if there's
   // a guarantee that only one condition will be true, but in this case,
   // multiple can be true, so separate ifs are correct.
   // We can directly append to the buffer or use string_view for known lengths.
   // Direct character copying to a pre-allocated buffer is generally faster
   // than string concatenation operations as it avoids temporary string objects.

   if (x % 3 == 0) {
      memcpy(buffer + offset, PLING.data(), PLING.length());
      offset += PLING.length();
   }
   if (x % 5 == 0) {
      memcpy(buffer + offset, PLANG.data(), PLANG.length());
      offset += PLANG.length();
   }
   if (x % 7 == 0) {
      memcpy(buffer + offset, PLONG.data(), PLONG.length());
      offset += PLONG.length();
   }

   if (offset == 0) {
      // If no "Pling", "Plang", or "Plong" were added, convert the number to string.
      // std::to_string might allocate, but for small numbers, SSO might apply.
      return std::to_string(x);
   } else {
      // Null-terminate the buffer before constructing the string
      buffer[offset] = '\0';
      return string(buffer); // Construct string from char array. This might copy.
   }
}