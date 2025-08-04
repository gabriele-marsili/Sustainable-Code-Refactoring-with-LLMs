#include "gigasecond.h"

namespace gigasecond {
	ptime advance(ptime time) {
		return time + seconds(1'000'000'000);
	}
} // namespace gigasecond
