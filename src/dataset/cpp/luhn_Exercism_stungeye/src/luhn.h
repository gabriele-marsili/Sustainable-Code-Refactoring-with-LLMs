#if !defined(LUHN_H)
#define LUHN_H
#include <string_view>

namespace luhn {
	bool valid(std::string_view number);
}  // namespace luhn

#endif // LUHN_H