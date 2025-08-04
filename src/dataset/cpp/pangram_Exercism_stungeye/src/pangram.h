#if !defined(PANGRAM_H)
#define PANGRAM_H

#include <string_view>

namespace pangram {
	bool is_pangram(std::string_view sentence);
}  // namespace pangram

#endif // PANGRAM_H