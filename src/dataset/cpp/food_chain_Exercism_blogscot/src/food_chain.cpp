#include "./food_chain.h"
#include <sstream>

namespace food_chain {

using std::string;

enum creatures {
  FLY = 1,
  SPIDER,
  BIRD,
  CAT,
  DOG,
  GOAT,
  COW,
  HORSE,
};

struct old_lady_msgs {
  string intro;
  string surprise;
  string statement;
  string outro;

  static auto get_msgs(int verse_num) -> old_lady_msgs {
    using food_chain::creatures;
    const string standard_outro =
        "I don't know why she swallowed the fly. Perhaps she'll die.\n";
    old_lady_msgs msgs;
    switch (verse_num) {
      case FLY:
        msgs.intro = "fly";
        msgs.surprise = "";
        msgs.statement = "";
        msgs.outro = standard_outro;
        break;
      case SPIDER:
        msgs.intro = "spider";
        msgs.surprise = "It wriggled and jiggled and tickled inside her.\n";
        msgs.statement = "She swallowed the spider to catch the fly.\n";
        msgs.outro = standard_outro;
        break;
      case BIRD:
        msgs.intro = "bird";
        msgs.surprise = "How absurd to swallow a bird!\n";
        msgs.statement =
            "She swallowed the bird to catch the spider that wriggled and "
            "jiggled and tickled inside her.\n";
        msgs.outro = standard_outro;
        break;
      case CAT:
        msgs.intro = "cat";
        msgs.surprise = "Imagine that, to swallow a cat!\n";
        msgs.statement = "She swallowed the cat to catch the bird.\n";
        msgs.outro = standard_outro;
        break;
      case DOG:
        msgs.intro = "dog";
        msgs.surprise = "What a hog, to swallow a dog!\n";
        msgs.statement = "She swallowed the dog to catch the cat.\n";
        msgs.outro = standard_outro;
        break;
      case GOAT:
        msgs.intro = "goat";
        msgs.surprise = "Just opened her throat and swallowed a goat!\n";
        msgs.statement = "She swallowed the goat to catch the dog.\n";
        msgs.outro = standard_outro;
        break;
      case COW:
        msgs.intro = "cow";
        msgs.surprise = "I don't know how she swallowed a cow!\n";
        msgs.statement = "She swallowed the cow to catch the goat.\n";
        msgs.outro = standard_outro;
        break;
      case HORSE:
        msgs.intro = "horse";
        msgs.surprise = "";
        msgs.statement = "";
        msgs.outro = "She's dead, of course!\n";
        break;
    }
    return msgs;
  }
};

auto verse(uint8_t num) -> string {
  using food_chain::creatures;
  std::stringstream ss;
  auto msgs = old_lady_msgs::get_msgs(num);

  ss << "I know an old lady who swallowed a " + msgs.intro << ".\n";
  if (num > FLY) {
    ss << msgs.surprise;
  }
  if (num == HORSE) {
    ss << msgs.outro;
    return ss.str();
  }
  while (num > FLY) {
    ss << msgs.statement;
    num--;
    msgs = old_lady_msgs::get_msgs(num);
  }
  ss << msgs.outro;
  return ss.str();
}
auto verses(uint8_t start, uint8_t end) -> string {
  using food_chain::creatures;
  assert(start < end && end <= HORSE);
  std::stringstream ss;

  for (int i = start; i <= end; ++i) {
    ss << verse(i);
    if (i != HORSE) ss << '\n';
  }
  return ss.str();
}
auto sing() -> string { return verses(1, 8); }

}  // namespace food_chain
