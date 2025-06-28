#if !defined(PHONE_NUMBER_H)
#define PHONE_NUMBER_H
#include <string>
#include <iostream>
#include <stdexcept>
namespace phone_number {
	class phone_number {
		std::string digits = "";
		std::string _area_digits = "";
		std::string _number_digits = "";
		void _area_code();
		void _number();
	public:
		phone_number(std::string);
		
		std::string number();
		std::string area_code();
		operator std::string() const;
	};
}  // namespace phone_number

#endif // PHONE_NUMBER_H