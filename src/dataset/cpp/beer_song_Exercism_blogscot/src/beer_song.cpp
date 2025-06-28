
#include "./beer_song.h"
#include <sstream>

namespace beer {

using std::string;
using std::to_string;

struct bottle_msgs {
  string how_many;
  string how_many_second;
  string instruction;
  string how_many_final;

  static auto get_msgs(uint8_t num_bottles) -> bottle_msgs {
    bottle_msgs msgs;
    if (num_bottles == 0) {
      msgs.how_many = "No more bottles";
      msgs.how_many_second = "no more bottles";
      msgs.instruction = "Go to the store and buy some more";
      msgs.how_many_final = "99 bottles";
    } else if (num_bottles == 1) {
      auto bottle = "1 bottle";
      msgs.how_many = bottle;
      msgs.how_many_second = bottle;
      msgs.instruction = "Take it down and pass it around";
      msgs.how_many_final = "no more bottles";
    } else if (num_bottles == 2) {
      auto bottles = "2 bottles";
      msgs.how_many = bottles;
      msgs.how_many_second = bottles;
      msgs.instruction = "Take one down and pass it around";
      msgs.how_many_final = "1 bottle";
    } else {
      auto how_many_bottles = to_string(num_bottles);
      auto bottles = " bottles";
      msgs.how_many = how_many_bottles + bottles;
      msgs.how_many_second = how_many_bottles + bottles;
      msgs.instruction = "Take one down and pass it around";
      msgs.how_many_final = to_string(num_bottles - 1) + bottles;
    }
    return msgs;
  }
};

auto verse(uint8_t num) -> std::string {
  auto msgs = bottle_msgs::get_msgs(num);
  return msgs.how_many + " of beer on the wall, " + msgs.how_many_second +
         " of beer.\n" + msgs.instruction + ", " + msgs.how_many_final +
         " of beer on the wall.\n";
}
auto sing(uint8_t start, uint8_t end) -> std::string {
  std::stringstream ss;
  for (int i = start; i >= end; --i) {
    ss << verse(i);
    if (i != end) ss << '\n';
  }
  return ss.str();
}
}  // namespace beer
