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
		size_t num_size = _number.size();
		if (num_size < 10 || num_size > 11)
			throw std::domain_error("invalid number length");
		if (num_size == 11) {
			if (_number[0] != '1')
				throw std::domain_error("invalid country code");
			_number.erase(0, 1); // Remove the country code efficiently
		}
		if (_number[0] < '2' || _number[3] < '2')
			throw std::domain_error("invalid area or exchange code");
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