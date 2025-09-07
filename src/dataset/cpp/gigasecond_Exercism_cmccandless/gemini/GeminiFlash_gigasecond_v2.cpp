#include "gigasecond.h"

using namespace boost::posix_time;

namespace gigasecond {

ptime advance(ptime t) {
  static const seconds gigasecond_duration(1000000000);
  return t + gigasecond_duration;
}

}  // namespace gigasecond