#include "phone_number.h"
#include <stdexcept>

namespace phone_number {
	phone_number::phone_number(const std::string& phone_number) {
		for (char digit : phone_number) {
			if (!std::isdigit(digit) && digit != ' ' && digit != '.' &&
				digit != '+' && digit != '-' && digit != '(' && digit != ')')
				throw std::domain_error("invalid number");
			if (std::isdigit(digit))
				_number.push_back(digit);
		}
		if (_number.size() < 10 || _number.size() > 11)
			throw std::domain_error("invalid number length");
		if (_number.size() > 10) {
			if (_number.at(0) != '1')
				throw std::domain_error("invalid country code");
			_number = _number.substr(1);
		}
		if (_number.at(0) < '2')
			throw std::domain_error("invalid area code");
		if (_number.at(3) < '2')
			throw std::domain_error("invalid exchange code");
	}

	const std::string&	phone_number::number() const {
		return _number;
	}

	std::string			phone_number::area_code() const {
		return _number.substr(0, 3);
	}

	phone_number::operator std::string() const {
		return "(" + _number.substr(0, 3) + ") " + _number.substr(3, 3) + "-" + _number.substr(6);
	}
}  // namespace phone_number
