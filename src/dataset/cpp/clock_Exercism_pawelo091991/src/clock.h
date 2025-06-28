#ifndef CLOCK_H
#define CLOCK_H
#include <string>
#include <sstream>
#include <iomanip>

namespace date_independent {
	class clock {
	private:
		int m_hours;
		int m_minutes;
		clock(int hours, int minutes) : m_hours{ hours }, m_minutes{ minutes }{}

	public:
		static clock at(int hours, int minutes);
		operator std::string() const;
		clock plus(int minutes);
		bool operator==(clock c) const;
		bool operator!=(clock c) const {return !(*this == c); }
	};
}

#endif //!CLOCK_H