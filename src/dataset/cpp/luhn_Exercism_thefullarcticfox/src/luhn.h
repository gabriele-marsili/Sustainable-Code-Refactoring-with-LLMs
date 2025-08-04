#if !defined(LUHN_H)
#define LUHN_H
#include <string>

namespace luhn {
	bool	valid(const std::string& str);
}  // namespace luhn

#endif // LUHN_H
