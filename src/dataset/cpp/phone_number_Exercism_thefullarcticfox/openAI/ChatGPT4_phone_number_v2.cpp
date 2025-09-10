#include "phone_number.h"
#include <stdexcept>
#include <cctype>

namespace phone_number {
	phone_number::phone_number(const std::string& phone_number) {
		_number.reserve(11); // Reserve memory upfront to avoid reallocations
		for (char digit : phone_number) {
			if (std::isdigit(digit)) {
				_number.push_back(digit);
			} else if (digit != ' ' && digit != '.' && digit != '+' && digit != '-' && digit != '(' && digit != ')') {
				throw std::domain_error("invalid number");
			}
		}
		if (_number.size() == 11) {
			if (_number[0] != '1') throw std::domain_error("invalid country code");
			_number.erase(0, 1); // Remove the country code
		} else if (_number.size() != 10) {
			throw std::domain_error("invalid number length");
		}
		if (_number[0] < '2') throw std::domain_error("invalid area code");
		if (_number[3] < '2') throw std::domain_error("invalid exchange code");
	}

	const std::string& phone_number::number() const {
		return _number;
	}

	std::string phone_number::area_code() const {
		return _number.substr(0, 3);
	}

	phone_number::operator std::string() const {
		return "(" + _number.substr(0, 3) + ") " + _number.substr(3, 3) + "-" + _number.substr(6);
	}
}  // namespace phone_number