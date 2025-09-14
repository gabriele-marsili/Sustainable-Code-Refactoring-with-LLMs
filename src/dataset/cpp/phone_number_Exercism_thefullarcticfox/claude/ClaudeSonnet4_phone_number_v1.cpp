#include "phone_number.h"
#include <stdexcept>

namespace phone_number {
	phone_number::phone_number(const std::string& phone_number) {
		_number.reserve(10);
		
		for (char digit : phone_number) {
			if (std::isdigit(digit)) {
				_number.push_back(digit);
			} else if (digit != ' ' && digit != '.' && digit != '+' && 
					   digit != '-' && digit != '(' && digit != ')') {
				throw std::domain_error("invalid number");
			}
		}
		
		const size_t size = _number.size();
		if (size < 10 || size > 11)
			throw std::domain_error("invalid number length");
		
		if (size == 11) {
			if (_number[0] != '1')
				throw std::domain_error("invalid country code");
			_number.erase(0, 1);
		}
		
		if (_number[0] < '2')
			throw std::domain_error("invalid area code");
		if (_number[3] < '2')
			throw std::domain_error("invalid exchange code");
	}

	const std::string&	phone_number::number() const {
		return _number;
	}

	std::string			phone_number::area_code() const {
		return _number.substr(0, 3);
	}

	phone_number::operator std::string() const {
		std::string result;
		result.reserve(14);
		result += '(';
		result.append(_number, 0, 3);
		result += ") ";
		result.append(_number, 3, 3);
		result += '-';
		result.append(_number, 6, 4);
		return result;
	}
}  // namespace phone_number