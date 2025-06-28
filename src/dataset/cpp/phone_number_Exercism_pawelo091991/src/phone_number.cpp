#include "phone_number.h"

namespace phone_number {
	phone_number::phone_number(std::string digits) {
		this->digits = digits;
		_area_code();
		_number();

		if (_number_digits.length() > 11 || _number_digits.length() < 9)
			throw std::domain_error("Wrong number of digits");

		if(_number_digits.length() == 11 && _number_digits[0] != '1')
			throw std::domain_error("First digit cannot start with 1 when there is 11 digits");
	
		if(_number_digits[0] == '0' || _number_digits[3] == '0')
			throw std::domain_error("Area code or exchange code start with 0");

		if(_area_digits[0] == '1' || _number_digits[3] == '1')
			throw std::domain_error("Area code or exchange code start with 1");
	}

	void phone_number::_number() {
		for (int i = 0; i < digits.length(); i++) {
			if ((i == 0 || i == 1) && (digits[i] == '1'))
				continue;
			if (isdigit(digits[i]))
				_number_digits += digits[i];
		}
	}

	std::string phone_number::number() {
		return _number_digits;
	}

	void phone_number::_area_code() {
		for (int i = 0; i < digits.length(); i++) {
			if (digits[i] == '(' && digits[i + 4] == ')') {
				_area_digits = digits.substr(i + 1, 3);
				break;
			}
		}
	}

	std::string phone_number::area_code() {
		return _area_digits;
	}



	phone_number::operator std::string() const{
		std::string digits = "";
		bool flag = false;
		for (int i = 0; i < this->digits.length(); i++) {
			if (this->digits[i] == '(') flag = true;
			if (flag == true)
				digits += this->digits[i];
		}
		return digits;
	}
	
}  // namespace phone_number
