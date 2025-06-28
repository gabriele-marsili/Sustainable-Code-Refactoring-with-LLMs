#ifndef BEER_SONG_H_
#define BEER_SONG_H_

#include <string>

namespace beer {

auto verse(uint8_t) -> std::string;
auto sing(uint8_t start, uint8_t end = 0) -> std::string;

}  // namespace beer

#endif  // BEER_SONG_H_
